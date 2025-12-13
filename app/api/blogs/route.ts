import { type NextRequest, NextResponse } from "next/server"
import { getAllBlogPosts, createBlogPost } from "@/lib/data-service"
import { requireAuth, getAuthUser } from "@/lib/auth"

export async function GET() {
  try {
    // Check if user is authenticated to show unpublished posts
    const user = await getAuthUser()
    const posts = await getAllBlogPosts(!!user)
    return NextResponse.json(posts)
  } catch (error) {
    console.error("[v0] Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const data = await request.json()
    const newPost = await createBlogPost(data)
    return NextResponse.json({ success: true, data: newPost }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("[v0] Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
