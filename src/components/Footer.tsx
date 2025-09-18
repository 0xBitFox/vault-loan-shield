import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Activity, Clock } from "lucide-react"
import { useEffect, useState } from "react"

export const Footer = () => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(72), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <footer className="bg-gradient-vault border-t border-border py-12">
      <div className="container mx-auto px-4">
        {/* Animated Repayment Tracker */}
        <div className="mb-8">
          <Card className="bg-gradient-card border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Global Repayment Tracker
                </h3>
                <p className="text-muted-foreground">
                  Real-time repayment progress across all active loans
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-medium">Total Loans Repaid</span>
                  <span className="text-primary font-bold text-lg">{progress}%</span>
                </div>
                
                <Progress 
                  value={progress} 
                  className="h-3 animate-progress-fill"
                  style={{ '--progress-width': `${progress}%` } as React.CSSProperties}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Loans</p>
                      <p className="font-semibold text-foreground">1,247</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
                    <Activity className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Volume</p>
                      <p className="font-semibold text-foreground">$45.2M</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Term</p>
                      <p className="font-semibold text-foreground">8.5 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Borrow</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Lend</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Vault</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Compliance</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Risk Disclosure</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 RWA Vault. All rights reserved. Secured by blockchain technology.
          </p>
        </div>
      </div>
    </footer>
  )
}