import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, FolderKanban, FileText, TrendingUp } from "lucide-react"
import { getAllProjects, getAllBlogPosts } from "@/lib/data-service"

export default async function AdminDashboardPage() {
  const projects = await getAllProjects()
  const blogPosts = await getAllBlogPosts(true)
  const publishedPosts = blogPosts.filter((p) => p.published)

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      description: `${projects.filter((p) => p.featured).length} featured`,
      icon: FolderKanban,
    },
    {
      title: "Blog Posts",
      value: blogPosts.length,
      description: `${publishedPosts.length} published`,
      icon: FileText,
    },
    {
      title: "Profile Views",
      value: "2,543",
      description: "+12% from last month",
      icon: TrendingUp,
    },
    {
      title: "Portfolio Items",
      value: projects.length + blogPosts.length,
      description: "Total content pieces",
      icon: User,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your latest project additions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-muted-foreground">{project.category}</p>
                  </div>
                  {project.featured && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Featured</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
            <CardDescription>Your latest articles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium line-clamp-1">{post.title}</p>
                    <p className="text-sm text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString()}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      post.published ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
