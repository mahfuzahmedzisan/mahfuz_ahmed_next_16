export interface PortfolioData {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  avatar: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
  skills: Skill[]
  experience: Experience[]
  education: Education[]
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number // 0-100
  icon?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  description: string
  technologies: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description?: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category: string
  featured: boolean
  createdAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  readTime: number
  published: boolean
}
