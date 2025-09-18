// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract VaultLoanShield is SepoliaConfig {
    using FHE for *;
    
    struct Loan {
        euint32 loanId;
        euint32 principalAmount;
        euint32 interestRate;
        euint32 collateralValue;
        euint32 remainingAmount;
        euint32 borrowerScore;
        bool isActive;
        bool isRepaid;
        bool isDefaulted;
        address borrower;
        address lender;
        uint256 startTime;
        uint256 endTime;
        string collateralType;
        string collateralHash;
    }
    
    struct Collateral {
        euint32 collateralId;
        euint32 value;
        euint32 loanToValueRatio;
        bool isVerified;
        bool isLiquidated;
        address owner;
        string assetType;
        string metadataHash;
        uint256 timestamp;
    }
    
    struct Reputation {
        euint32 score;
        euint32 totalLoans;
        euint32 successfulRepayments;
        euint32 defaults;
        bool isVerified;
        address user;
    }
    
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => Collateral) public collaterals;
    mapping(address => Reputation) public reputations;
    mapping(address => euint32[]) public userLoans;
    mapping(address => euint32[]) public userCollaterals;
    
    uint256 public loanCounter;
    uint256 public collateralCounter;
    
    address public owner;
    address public verifier;
    address public liquidator;
    
    // Loan-to-Value ratios for different asset types
    mapping(string => euint32) public ltvRatios;
    
    event LoanCreated(uint256 indexed loanId, address indexed borrower, address indexed lender);
    event CollateralAdded(uint256 indexed collateralId, address indexed owner);
    event LoanRepaid(uint256 indexed loanId, uint32 amount);
    event LoanDefaulted(uint256 indexed loanId);
    event CollateralLiquidated(uint256 indexed collateralId, uint32 amount);
    event ReputationUpdated(address indexed user, uint32 score);
    
    constructor(address _verifier, address _liquidator) {
        owner = msg.sender;
        verifier = _verifier;
        liquidator = _liquidator;
        
        // Set default LTV ratios (encrypted)
        ltvRatios["real_estate"] = FHE.asEuint32(70); // 70%
        ltvRatios["precious_metals"] = FHE.asEuint32(80); // 80%
        ltvRatios["artwork"] = FHE.asEuint32(50); // 50%
        ltvRatios["vehicles"] = FHE.asEuint32(60); // 60%
    }
    
    function addCollateral(
        externalEuint32 value,
        string memory assetType,
        string memory metadataHash,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(assetType).length > 0, "Asset type cannot be empty");
        require(bytes(metadataHash).length > 0, "Metadata hash cannot be empty");
        
        uint256 collateralId = collateralCounter++;
        
        // Convert external encrypted value to internal
        euint32 internalValue = FHE.fromExternal(value, inputProof);
        
        // Get LTV ratio for asset type
        euint32 ltvRatio = ltvRatios[assetType];
        
        collaterals[collateralId] = Collateral({
            collateralId: FHE.asEuint32(0), // Will be set properly later
            value: internalValue,
            loanToValueRatio: ltvRatio,
            isVerified: false,
            isLiquidated: false,
            owner: msg.sender,
            assetType: assetType,
            metadataHash: metadataHash,
            timestamp: block.timestamp
        });
        
        userCollaterals[msg.sender].push(FHE.asEuint32(collateralId));
        
        emit CollateralAdded(collateralId, msg.sender);
        return collateralId;
    }
    
    function createLoan(
        uint256 collateralId,
        externalEuint32 principalAmount,
        externalEuint32 interestRate,
        uint256 duration,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(collaterals[collateralId].owner == msg.sender, "Not collateral owner");
        require(!collaterals[collateralId].isLiquidated, "Collateral is liquidated");
        require(collaterals[collateralId].isVerified, "Collateral not verified");
        require(duration > 0, "Duration must be positive");
        
        // Convert external encrypted values to internal
        euint32 internalPrincipal = FHE.fromExternal(principalAmount, inputProof);
        euint32 internalInterest = FHE.fromExternal(interestRate, inputProof);
        
        // Calculate maximum loan amount based on collateral value and LTV
        euint32 collateralValue = collaterals[collateralId].value;
        euint32 maxLoanAmount = FHE.mul(collateralValue, collaterals[collateralId].loanToValueRatio);
        maxLoanAmount = FHE.div(maxLoanAmount, FHE.asEuint32(100)); // Convert percentage to decimal
        
        // Verify loan amount doesn't exceed maximum
        require(FHE.decrypt(FHE.le(internalPrincipal, maxLoanAmount)), "Loan amount exceeds LTV limit");
        
        uint256 loanId = loanCounter++;
        
        loans[loanId] = Loan({
            loanId: FHE.asEuint32(0), // Will be set properly later
            principalAmount: internalPrincipal,
            interestRate: internalInterest,
            collateralValue: collateralValue,
            remainingAmount: internalPrincipal,
            borrowerScore: reputations[msg.sender].score,
            isActive: true,
            isRepaid: false,
            isDefaulted: false,
            borrower: msg.sender,
            lender: address(0), // Will be set when loan is funded
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            collateralType: collaterals[collateralId].assetType,
            collateralHash: collaterals[collateralId].metadataHash
        });
        
        userLoans[msg.sender].push(FHE.asEuint32(loanId));
        
        emit LoanCreated(loanId, msg.sender, address(0));
        return loanId;
    }
    
    function fundLoan(
        uint256 loanId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable {
        require(loans[loanId].borrower != address(0), "Loan does not exist");
        require(loans[loanId].isActive, "Loan is not active");
        require(loans[loanId].lender == address(0), "Loan already funded");
        require(loans[loanId].borrower != msg.sender, "Cannot fund own loan");
        
        // Convert external encrypted amount to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Verify funding amount matches loan principal
        require(FHE.decrypt(FHE.eq(internalAmount, loans[loanId].principalAmount)), "Amount must match principal");
        
        // Update loan with lender information
        loans[loanId].lender = msg.sender;
        
        // Transfer funds to borrower (in a real implementation, this would be done securely)
        // payable(loans[loanId].borrower).transfer(msg.value);
    }
    
    function repayLoan(
        uint256 loanId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable {
        require(loans[loanId].borrower == msg.sender, "Not loan borrower");
        require(loans[loanId].isActive, "Loan is not active");
        require(!loans[loanId].isRepaid, "Loan already repaid");
        
        // Convert external encrypted amount to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Update remaining amount
        loans[loanId].remainingAmount = FHE.sub(loans[loanId].remainingAmount, internalAmount);
        
        // Check if loan is fully repaid
        ebool isFullyRepaid = FHE.le(loans[loanId].remainingAmount, FHE.asEuint32(0));
        
        if (FHE.decrypt(isFullyRepaid)) {
            loans[loanId].isRepaid = true;
            loans[loanId].isActive = false;
            
            // Update borrower reputation
            reputations[msg.sender].successfulRepayments = FHE.add(
                reputations[msg.sender].successfulRepayments, 
                FHE.asEuint32(1)
            );
        }
        
        emit LoanRepaid(loanId, 0); // Amount will be decrypted off-chain
    }
    
    function defaultLoan(uint256 loanId) public {
        require(msg.sender == liquidator, "Only liquidator can default loan");
        require(loans[loanId].isActive, "Loan is not active");
        require(block.timestamp > loans[loanId].endTime, "Loan not yet expired");
        require(!loans[loanId].isRepaid, "Loan already repaid");
        
        loans[loanId].isDefaulted = true;
        loans[loanId].isActive = false;
        
        // Update borrower reputation
        address borrower = loans[loanId].borrower;
        reputations[borrower].defaults = FHE.add(
            reputations[borrower].defaults, 
            FHE.asEuint32(1)
        );
        
        emit LoanDefaulted(loanId);
    }
    
    function liquidateCollateral(uint256 collateralId) public {
        require(msg.sender == liquidator, "Only liquidator can liquidate");
        require(collaterals[collateralId].owner != address(0), "Collateral does not exist");
        require(!collaterals[collateralId].isLiquidated, "Already liquidated");
        
        collaterals[collateralId].isLiquidated = true;
        
        emit CollateralLiquidated(collateralId, 0); // Amount will be decrypted off-chain
    }
    
    function verifyCollateral(uint256 collateralId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify collateral");
        require(collaterals[collateralId].owner != address(0), "Collateral does not exist");
        
        collaterals[collateralId].isVerified = isVerified;
    }
    
    function updateReputation(
        address user,
        externalEuint32 score,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Convert external encrypted score to internal
        euint32 internalScore = FHE.fromExternal(score, inputProof);
        
        reputations[user].score = internalScore;
        reputations[user].isVerified = true;
        
        emit ReputationUpdated(user, 0); // Score will be decrypted off-chain
    }
    
    function getLoanInfo(uint256 loanId) public view returns (
        address borrower,
        address lender,
        bool isActive,
        bool isRepaid,
        bool isDefaulted,
        uint256 startTime,
        uint256 endTime,
        string memory collateralType,
        string memory collateralHash
    ) {
        Loan storage loan = loans[loanId];
        return (
            loan.borrower,
            loan.lender,
            loan.isActive,
            loan.isRepaid,
            loan.isDefaulted,
            loan.startTime,
            loan.endTime,
            loan.collateralType,
            loan.collateralHash
        );
    }
    
    function getCollateralInfo(uint256 collateralId) public view returns (
        address owner,
        string memory assetType,
        string memory metadataHash,
        bool isVerified,
        bool isLiquidated,
        uint256 timestamp
    ) {
        Collateral storage collateral = collaterals[collateralId];
        return (
            collateral.owner,
            collateral.assetType,
            collateral.metadataHash,
            collateral.isVerified,
            collateral.isLiquidated,
            collateral.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (
        bool isVerified,
        uint8 score,
        uint8 totalLoans,
        uint8 successfulRepayments,
        uint8 defaults
    ) {
        Reputation storage rep = reputations[user];
        return (
            rep.isVerified,
            0, // FHE.decrypt(rep.score) - will be decrypted off-chain
            0, // FHE.decrypt(rep.totalLoans) - will be decrypted off-chain
            0, // FHE.decrypt(rep.successfulRepayments) - will be decrypted off-chain
            0  // FHE.decrypt(rep.defaults) - will be decrypted off-chain
        );
    }
    
    function calculateLoanAmount(
        uint256 collateralId,
        externalEuint32 requestedAmount,
        bytes calldata inputProof
    ) public view returns (bool isApproved, uint8 maxAmount) {
        require(collaterals[collateralId].owner != address(0), "Collateral does not exist");
        require(collaterals[collateralId].isVerified, "Collateral not verified");
        
        // Convert external encrypted amount to internal
        euint32 internalAmount = FHE.fromExternal(requestedAmount, inputProof);
        
        // Calculate maximum loan amount
        euint32 collateralValue = collaterals[collateralId].value;
        euint32 ltvRatio = collaterals[collateralId].loanToValueRatio;
        euint32 maxLoanAmount = FHE.mul(collateralValue, ltvRatio);
        maxLoanAmount = FHE.div(maxLoanAmount, FHE.asEuint32(100));
        
        // Check if requested amount is within limits
        ebool isWithinLimit = FHE.le(internalAmount, maxLoanAmount);
        
        return (
            FHE.decrypt(isWithinLimit),
            0 // FHE.decrypt(maxLoanAmount) - will be decrypted off-chain
        );
    }
}
