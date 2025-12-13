import { getPortfolioData } from "@/lib/data-service"
import { PortfolioForm } from "@/components/admin/portfolio-form"

export default async function AdminPortfolioPage() {
  const portfolio = await getPortfolioData()

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Portfolio Settings</h1>
        <p className="text-muted-foreground">Manage your personal information, skills, and experience</p>
      </div>

      <PortfolioForm portfolio={portfolio} />
    </div>
  )
}
