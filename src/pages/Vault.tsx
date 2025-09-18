import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LoanDashboard } from "@/components/LoanDashboard"

const Vault = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LoanDashboard />
      <Footer />
    </div>
  )
}

export default Vault