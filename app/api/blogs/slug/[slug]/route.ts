import { type NextRequest, NextResponse } from "next/server"
import { getBlogPostBySlug } from "@/lib/data-service"

export async function GET(request: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  try {
    const post = await getBlogPostBySlug(params.slug)
    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error("[v0] Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}
