import { VaultButton } from "@/components/ui/vault-button"
import { Shield, Lock, Coins, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export const Hero = () => {
  return (
    <section className="relative py-20 bg-gradient-vault overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary animate-vault-glow" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-primary animate-vault-glow" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-gradient-card border border-primary/20 shadow-gold">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            Borrow Against RWA Privately
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Secure peer-to-peer loans backed by real-world assets. Your collateral remains encrypted and private until repayment completion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <VaultButton variant="vault" size="xl" className="flex items-center space-x-2" asChild>
              <Link to="/borrow">
                <Coins className="h-5 w-5" />
                <span>Start Borrowing</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </VaultButton>
            
            <VaultButton variant="outline" size="xl" className="flex items-center space-x-2" asChild>
              <Link to="/vault">
                <Lock className="h-5 w-5" />
                <span>Explore Vault</span>
              </Link>
            </VaultButton>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-gradient-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <Shield className="h-8 w-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Private & Encrypted</h3>
              <p className="text-muted-foreground">Your RWA details stay encrypted until loan completion</p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <Coins className="h-8 w-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Real-World Assets</h3>
              <p className="text-muted-foreground">Collateralize with property, vehicles, art, and more</p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <Lock className="h-8 w-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Secure Contracts</h3>
              <p className="text-muted-foreground">Smart contracts ensure automatic repayment terms</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}