import { type NextRequest, NextResponse } from "next/server"
import { getPortfolioData, updatePortfolioData } from "@/lib/data-service"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching portfolio data:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth()
    const data = await request.json()
    await updatePortfolioData(data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("[v0] Error updating portfolio data:", error)
    return NextResponse.json({ error: "Failed to update portfolio data" }, { status: 500 })
  }
}
