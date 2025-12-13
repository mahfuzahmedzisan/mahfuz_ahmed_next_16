import { type NextRequest, NextResponse } from "next/server"
import { getBlogPostById, updateBlogPost, deleteBlogPost } from "@/lib/data-service"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const post = await getBlogPostById(params.id)
    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error("[v0] Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    await requireAuth()
    const data = await request.json()
    const updatedPost = await updateBlogPost(params.id, data)
    if (!updatedPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: updatedPost })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("[v0] Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    await requireAuth()
    const success = await deleteBlogPost(params.id)
    if (!success) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("[v0] Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
