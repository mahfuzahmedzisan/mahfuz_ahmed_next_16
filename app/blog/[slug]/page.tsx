import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { BlogPost } from "@/lib/types"

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/blogs/slug/${slug}`, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const post = await getBlogPost(params.slug)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-background to-muted/20">
          <div className="container">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <span>By {post.author}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container">
            <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
              <div className="whitespace-pre-wrap leading-relaxed text-foreground">{post.content}</div>
            </article>
          </div>
        </section>

        {/* Author Info */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 p-6 bg-background rounded-lg border">
                <div className="relative h-20 w-20 rounded-full overflow-hidden shrink-0">
                  <Image src="/placeholder.svg?height=80&width=80" alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">{post.author}</h3>
                  <p className="text-muted-foreground">
                    Full-stack web developer specializing in Laravel, Livewire, React, and Next.js.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
