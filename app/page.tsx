import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { PortfolioData } from "@/lib/types"

async function getPortfolioData(): Promise<PortfolioData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/portfolio`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch portfolio data")
  return res.json()
}

export default async function HomePage() {
  const portfolio = await getPortfolioData()

  const skillsByCategory = portfolio.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof portfolio.skills>,
  )

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">{portfolio.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-6">{portfolio.title}</p>
                <p className="text-lg text-muted-foreground mb-8 text-pretty">{portfolio.bio}</p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Button asChild size="lg">
                    <Link href="/showcase">View Projects</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/blog">Read Blog</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {portfolio.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${portfolio.email}`} className="hover:text-primary transition-colors">
                        {portfolio.email}
                      </a>
                    </div>
                  )}
                  {portfolio.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{portfolio.phone}</span>
                    </div>
                  )}
                  {portfolio.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{portfolio.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-full blur-3xl" />
                  <Image
                    src={portfolio.avatar || "/placeholder.svg"}
                    alt={portfolio.name}
                    width={400}
                    height={400}
                    className="relative rounded-full border-4 border-background shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-12">
              {portfolio.socialLinks.github && (
                <a
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {portfolio.socialLinks.linkedin && (
                <a
                  href={portfolio.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {portfolio.socialLinks.twitter && (
                <a
                  href={portfolio.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {portfolio.socialLinks.website && (
                <a
                  href={portfolio.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Technical Skills</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Proficient in modern web development technologies with years of hands-on experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Work Experience</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Building impactful solutions for leading companies.
            </p>

            <div className="max-w-4xl mx-auto space-y-8">
              {portfolio.experience.map((exp) => (
                <Card key={exp.id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle>{exp.title}</CardTitle>
                        <CardDescription>
                          {exp.company} • {exp.location}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Education</h2>

            <div className="max-w-4xl mx-auto space-y-6">
              {portfolio.education.map((edu) => (
                <Card key={edu.id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle>{edu.degree}</CardTitle>
                        <CardDescription>
                          {edu.institution} • {edu.location}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {edu.startDate} - {edu.endDate}
                      </Badge>
                    </div>
                  </CardHeader>
                  {edu.description && (
                    <CardContent>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
