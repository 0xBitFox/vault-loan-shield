import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { VaultButton } from "@/components/ui/vault-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { EncryptedDataForm } from "@/components/EncryptedDataForm"
import { Shield, Clock, Percent, FileText, Lock } from "lucide-react"

const Borrow = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Borrow Against Your Assets
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Unlock liquidity from your real-world assets with encrypted, peer-to-peer lending
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-foreground">
                    <Lock className="h-6 w-6 text-primary" />
                    Add Collateral (FHE-Encrypted)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EncryptedDataForm 
                    type="collateral" 
                    onSuccess={(hash) => console.log('Collateral added:', hash)}
                  />
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-foreground">
                    <Shield className="h-6 w-6 text-primary" />
                    Create Loan Request
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EncryptedDataForm 
                    type="loan" 
                    onSuccess={(hash) => console.log('Loan created:', hash)}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>How It Works</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-medium text-foreground">Submit Request</h4>
                        <p className="text-sm text-muted-foreground">Upload asset details - encrypted until funded</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-medium text-foreground">Get Offers</h4>
                        <p className="text-sm text-muted-foreground">Lenders compete with rate proposals</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-medium text-foreground">Accept & Receive</h4>
                        <p className="text-sm text-muted-foreground">Choose best offer, get funds instantly</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle>Current Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Percent className="h-4 w-4 text-primary" />
                        <span className="text-2xl font-bold text-foreground">8.5%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Avg. Property APR</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-2xl font-bold text-foreground">24h</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Avg. Approval Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Asset Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    <FileText className="h-3 w-3 mr-1" />
                    Ownership Proof
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    <Shield className="h-3 w-3 mr-1" />
                    Asset Valuation
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    Legal Documentation
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Borrow