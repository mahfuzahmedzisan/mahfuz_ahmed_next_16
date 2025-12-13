import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/lib/types"

async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/blogs`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch blog posts")
  return res.json()
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const latestPost = posts[0]
  const olderPosts = posts.slice(1)

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Tech Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Insights, tutorials, and thoughts on web development, Laravel, React, and modern tech stacks.
            </p>
          </div>
        </section>

        {/* Latest Post */}
        {latestPost && (
          <section className="py-20">
            <div className="container">
              <h2 className="text-2xl font-bold mb-8">Latest Post</h2>

              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={latestPost.coverImage || "/placeholder.svg"}
                      alt={latestPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {latestPost.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-3xl font-bold mb-4 text-balance">{latestPost.title}</h3>

                    <p className="text-muted-foreground mb-6 text-pretty">{latestPost.excerpt}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(latestPost.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{latestPost.readTime} min read</span>
                      </div>
                    </div>

                    <Button asChild>
                      <Link href={`/blog/${latestPost.slug}`}>
                        Read Article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Older Posts */}
        {olderPosts.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container">
              <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {olderPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden flex flex-col">
                    <div className="relative h-48">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <CardHeader className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <CardTitle className="text-xl mb-2 line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>

                      <Button asChild variant="outline" className="w-full bg-transparent">
                        <Link href={`/blog/${post.slug}`}>Read More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
