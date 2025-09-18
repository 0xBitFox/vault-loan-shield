import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { VaultButton } from "@/components/ui/vault-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, Percent, FileText } from "lucide-react"

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
            <div>
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Create Loan Request</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Loan Amount (USDC)</Label>
                    <Input 
                      id="amount" 
                      placeholder="Enter amount..."
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asset">Asset Type</Label>
                    <Select>
                      <SelectTrigger className="bg-background/50 border-primary/20">
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="property">Real Estate Property</SelectItem>
                        <SelectItem value="vehicle">Vehicle Title</SelectItem>
                        <SelectItem value="equipment">Equipment/Machinery</SelectItem>
                        <SelectItem value="inventory">Business Inventory</SelectItem>
                        <SelectItem value="other">Other Asset</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="term">Loan Term</Label>
                    <Select>
                      <SelectTrigger className="bg-background/50 border-primary/20">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Asset Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Describe your asset (will be encrypted until funded)..."
                      className="bg-background/50 border-primary/20"
                      rows={4}
                    />
                  </div>

                  <VaultButton className="w-full" size="lg">
                    Submit Loan Request
                  </VaultButton>
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