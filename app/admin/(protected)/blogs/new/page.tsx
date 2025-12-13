import { BlogForm } from "@/components/admin/blog-form"

export default function NewBlogPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Blog Post</h1>
        <p className="text-muted-foreground">Create a new article for your blog</p>
      </div>

      <BlogForm />
    </div>
  )
}
