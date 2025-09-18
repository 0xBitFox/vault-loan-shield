import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VaultButton } from "@/components/ui/vault-button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Wallet, TrendingUp, Clock, Shield } from "lucide-react"
import { Link } from "react-router-dom"

export const LoanDashboard = () => {
  const mockLoans = [
    {
      id: "1",
      amount: "50,000 USDC",
      collateral: "Property Deed #A123",
      apr: "8.5%",
      term: "12 months",
      progress: 65,
      status: "Active",
      nextPayment: "Jan 15, 2024"
    },
    {
      id: "2", 
      amount: "25,000 USDC",
      collateral: "Vehicle Title #V789",
      apr: "12.0%",
      term: "6 months", 
      progress: 85,
      status: "Active",
      nextPayment: "Jan 20, 2024"
    }
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Your Loan Vault
          </h2>
          <p className="text-muted-foreground text-lg">
            Monitor your active loans and repayment progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Borrowed
              </CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">75,000 USDC</div>
              <p className="text-xs text-muted-foreground">
                Across 2 active loans
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg. APR
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">10.25%</div>
              <p className="text-xs text-muted-foreground">
                Competitive rates
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Payment
              </CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Jan 15</div>
              <p className="text-xs text-muted-foreground">
                5,200 USDC due
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground mb-6">Active Loans</h3>
          
          {mockLoans.map((loan) => (
            <Card key={loan.id} className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-xl font-semibold text-foreground">{loan.amount}</h4>
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        {loan.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm">Collateral: {loan.collateral}</span>
                    </div>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <span>APR: {loan.apr}</span>
                      <span>Term: {loan.term}</span>
                      <span>Next: {loan.nextPayment}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 lg:w-80">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Repayment Progress</span>
                        <span className="text-foreground font-medium">{loan.progress}%</span>
                      </div>
                      <Progress value={loan.progress} className="h-2" />
                    </div>
                    
                    <div className="flex space-x-2">
                      <VaultButton size="sm" variant="outline">
                        Make Payment
                      </VaultButton>
                      <VaultButton size="sm" variant="ghost">
                        View Details
                      </VaultButton>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <VaultButton variant="vault" size="lg" className="flex items-center space-x-2 mx-auto" asChild>
            <Link to="/create-loan">
              <span>Create New Loan</span>
            </Link>
          </VaultButton>
        </div>
      </div>
    </section>
  )
}