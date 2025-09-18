import { WalletButton } from "@/components/WalletButton"
import { Wallet, Shield, Lock } from "lucide-react"
import { Link } from "react-router-dom"
import logoImage from "@/assets/logo-coin.png"

export const Header = () => {
  return (
    <header className="border-b border-border bg-gradient-vault backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="RWA Vault Logo" 
              className="h-10 w-10 animate-gold-pulse"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">RWA Vault</h1>
              <p className="text-sm text-muted-foreground">Private Lending Protocol</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/borrow" className="text-muted-foreground hover:text-primary transition-colors">
              Borrow
            </Link>
            <Link to="/lend" className="text-muted-foreground hover:text-primary transition-colors">
              Lend
            </Link>
            <Link to="/vault" className="text-muted-foreground hover:text-primary transition-colors">
              Vault
            </Link>
          </nav>

          <WalletButton />
        </div>
      </div>
    </header>
  )
}