import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { VaultButton } from "@/components/ui/vault-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, TrendingUp, Clock, MapPin, Search, Filter } from "lucide-react"

const Lend = () => {
  const mockLoanRequests = [
    {
      id: "1",
      amount: "50,000 USDC",
      assetType: "Real Estate Property",
      requestedAPR: "8.5%",
      term: "12 months",
      location: "California, US",
      ltv: "65%",
      funded: 0,
      target: 50000,
      timeLeft: "5 days",
      riskScore: "Low"
    },
    {
      id: "2",
      amount: "25,000 USDC", 
      assetType: "Vehicle Title",
      requestedAPR: "12.0%",
      term: "6 months",
      location: "Texas, US",
      ltv: "70%",
      funded: 15000,
      target: 25000,
      timeLeft: "2 days",
      riskScore: "Medium"
    },
    {
      id: "3",
      amount: "100,000 USDC",
      assetType: "Equipment/Machinery", 
      requestedAPR: "10.2%",
      term: "18 months",
      location: "New York, US",
      ltv: "60%",
      funded: 80000,
      target: 100000,
      timeLeft: "1 day",
      riskScore: "Low"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Lend & Earn Returns
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Fund asset-backed loans with competitive returns and built-in security
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-card border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Avg. APR</span>
                </div>
                <div className="text-2xl font-bold text-foreground">9.8%</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Default Rate</span>
                </div>
                <div className="text-2xl font-bold text-foreground">1.2%</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Avg. Term</span>
                </div>
                <div className="text-2xl font-bold text-foreground">14 mo</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Active Loans</span>
                </div>
                <div className="text-2xl font-bold text-foreground">127</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filter Opportunities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Asset Type</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50 border-primary/20">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="property">Real Estate</SelectItem>
                      <SelectItem value="vehicle">Vehicles</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Min APR (%)</Label>
                  <Input 
                    placeholder="8.0"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Max Term</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50 border-primary/20">
                      <SelectValue placeholder="Any term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Risk Level</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50 border-primary/20">
                      <SelectValue placeholder="All risks" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Available Lending Opportunities</h2>
            
            {mockLoanRequests.map((loan) => (
              <Card key={loan.id} className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold text-foreground">{loan.amount}</h3>
                        <Badge variant="outline" className={`
                          ${loan.riskScore === 'Low' ? 'border-green-500 text-green-400' : 
                            loan.riskScore === 'Medium' ? 'border-yellow-500 text-yellow-400' : 
                            'border-red-500 text-red-400'}
                        `}>
                          {loan.riskScore} Risk
                        </Badge>
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          {loan.assetType}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">APR: </span>
                          <span className="font-medium text-foreground">{loan.requestedAPR}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Term: </span>
                          <span className="font-medium text-foreground">{loan.term}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">LTV: </span>
                          <span className="font-medium text-foreground">{loan.ltv}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span className="font-medium text-foreground">{loan.location}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Funding Progress</span>
                          <span className="text-foreground font-medium">
                            ${loan.funded.toLocaleString()} / ${loan.target.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(loan.funded / loan.target) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{Math.round((loan.funded / loan.target) * 100)}% funded</span>
                          <span>{loan.timeLeft} remaining</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 lg:w-48">
                      <VaultButton size="sm" className="w-full">
                        Fund Loan
                      </VaultButton>
                      <VaultButton size="sm" variant="outline" className="w-full">
                        View Details
                      </VaultButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Lend