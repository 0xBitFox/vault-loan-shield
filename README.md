# Vault Loan Shield

A secure peer-to-peer lending platform backed by real-world assets with fully homomorphic encryption (FHE) for privacy-preserving transactions.

## Features

- **Private Lending**: Encrypted collateral data using FHE technology
- **Real-World Assets**: Secure backing with physical assets
- **Smart Contracts**: Automated loan management and repayment
- **Privacy-First**: All sensitive data encrypted on-chain
- **Multi-Wallet Support**: Connect with various Web3 wallets

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Radix UI + Tailwind CSS
- **Blockchain**: Ethereum (Sepolia Testnet)
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Wallet Integration**: RainbowKit + Wagmi

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/0xBitFox/vault-loan-shield.git
cd vault-loan-shield
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

## Environment Configuration

Create a `.env` file with the following variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## Smart Contracts

The platform uses FHE-enabled smart contracts for:
- Encrypted collateral storage
- Private loan calculations
- Secure repayment processing
- Reputation management

## Security Features

- **FHE Encryption**: All sensitive data encrypted on-chain
- **Zero-Knowledge Proofs**: Verify transactions without revealing data
- **Multi-Signature Wallets**: Enhanced security for large transactions
- **Audit Trail**: Transparent yet private transaction history

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Mobile app support
- [ ] Additional asset types
- [ ] Cross-chain compatibility
- [ ] Advanced analytics dashboard
- [ ] Insurance integration