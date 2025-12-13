import { getBlogPostById } from "@/lib/data-service"
import { BlogForm } from "@/components/admin/blog-form"
import { notFound } from "next/navigation"

export default async function EditBlogPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const post = await getBlogPostById(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Blog Post</h1>
        <p className="text-muted-foreground">Update your blog post</p>
      </div>

      <BlogForm post={post} />
    </div>
  )
}
