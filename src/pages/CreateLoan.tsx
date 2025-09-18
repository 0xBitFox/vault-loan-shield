import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { VaultButton } from "@/components/ui/vault-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Shield, Upload, FileText, CheckCircle, ArrowRight } from "lucide-react"
import { useState } from "react"

const CreateLoan = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const steps = [
    { id: 1, title: "Asset Details", icon: FileText },
    { id: 2, title: "Documentation", icon: Upload },
    { id: 3, title: "Loan Terms", icon: Shield },
    { id: 4, title: "Review & Submit", icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Create New Loan
            </h1>
            <p className="text-muted-foreground text-xl">
              Start borrowing against your real-world assets in minutes
            </p>
          </div>

          {/* Progress Bar */}
          <Card className="bg-gradient-card border-primary/20 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {Math.round((currentStep / totalSteps) * 100)}% Complete
                </span>
              </div>
              <Progress value={(currentStep / totalSteps) * 100} className="h-2 mb-6" />
              
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = currentStep === step.id
                  const isCompleted = currentStep > step.id
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`
                        flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                        ${isCompleted ? 'bg-primary border-primary text-primary-foreground' :
                          isActive ? 'border-primary text-primary bg-primary/10' :
                          'border-muted text-muted-foreground'}
                      `}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="ml-3 text-left">
                        <div className={`text-sm font-medium ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.title}
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <ArrowRight className="mx-4 h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                {steps.find(s => s.id === currentStep)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="assetType">Asset Type</Label>
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
                      <Label htmlFor="value">Estimated Asset Value (USD)</Label>
                      <Input 
                        id="value"
                        placeholder="Enter estimated value..."
                        className="bg-background/50 border-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Asset Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Provide detailed description of your asset..."
                      className="bg-background/50 border-primary/20"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Asset Location</Label>
                    <Input 
                      id="location"
                      placeholder="City, State, Country..."
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 bg-background/30">
                      <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">Upload Documents</h3>
                      <p className="text-muted-foreground mb-4">
                        Upload ownership proof, valuation reports, and other relevant documents
                      </p>
                      <VaultButton variant="outline">
                        Choose Files
                      </VaultButton>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Badge variant="outline" className="p-3 justify-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Ownership Proof
                    </Badge>
                    <Badge variant="outline" className="p-3 justify-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Asset Valuation
                    </Badge>
                    <Badge variant="outline" className="p-3 justify-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Insurance (Optional)
                    </Badge>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Desired Loan Amount (USDC)</Label>
                      <Input 
                        id="amount"
                        placeholder="Enter loan amount..."
                        className="bg-background/50 border-primary/20"
                      />
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
                          <SelectItem value="36">36 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxAPR">Maximum APR (%)</Label>
                    <Input 
                      id="maxAPR"
                      placeholder="Maximum acceptable interest rate..."
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Loan Purpose</Label>
                    <Textarea 
                      id="purpose"
                      placeholder="What will you use this loan for? (Optional)"
                      className="bg-background/50 border-primary/20"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-background/30 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Loan Summary</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Asset Type: </span>
                        <span className="text-foreground font-medium">Real Estate Property</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Asset Value: </span>
                        <span className="text-foreground font-medium">$150,000</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Loan Amount: </span>
                        <span className="text-foreground font-medium">50,000 USDC</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Loan Term: </span>
                        <span className="text-foreground font-medium">12 months</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max APR: </span>
                        <span className="text-foreground font-medium">8.5%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">LTV Ratio: </span>
                        <span className="text-foreground font-medium">33.3%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-foreground">Privacy Protection</p>
                        <p className="text-muted-foreground">
                          Your asset details will be encrypted and only revealed to lenders who make competitive offers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-primary/20">
                <VaultButton 
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </VaultButton>
                
                <VaultButton
                  onClick={() => {
                    if (currentStep < totalSteps) {
                      setCurrentStep(currentStep + 1)
                    }
                  }}
                >
                  {currentStep === totalSteps ? 'Submit Loan Request' : 'Continue'}
                </VaultButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default CreateLoan