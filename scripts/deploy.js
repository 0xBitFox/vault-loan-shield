const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying VaultLoanShield contract...");
  
  // Get the contract factory
  const VaultLoanShield = await ethers.getContractFactory("VaultLoanShield");
  
  // Deploy the contract
  // Note: In a real deployment, you would need to provide verifier and liquidator addresses
  const verifier = "0x0000000000000000000000000000000000000000"; // Replace with actual verifier address
  const liquidator = "0x0000000000000000000000000000000000000000"; // Replace with actual liquidator address
  
  const vaultLoanShield = await VaultLoanShield.deploy(verifier, liquidator);
  
  await vaultLoanShield.waitForDeployment();
  
  const address = await vaultLoanShield.getAddress();
  console.log("VaultLoanShield deployed to:", address);
  
  // Save deployment info
  const deploymentInfo = {
    contractName: "VaultLoanShield",
    address: address,
    verifier: verifier,
    liquidator: liquidator,
    deploymentTime: new Date().toISOString(),
    network: "sepolia"
  };
  
  console.log("Deployment completed successfully!");
  console.log("Contract address:", address);
  console.log("Verifier address:", verifier);
  console.log("Liquidator address:", liquidator);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
