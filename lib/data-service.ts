import fs from "fs/promises"
import path from "path"
import type { PortfolioData, Project, BlogPost } from "./types"

const DATA_DIR = path.join(process.cwd(), "data")

// Portfolio Data Service
export async function getPortfolioData(): Promise<PortfolioData> {
  const filePath = path.join(DATA_DIR, "portfolio.json")
  const data = await fs.readFile(filePath, "utf-8")
  return JSON.parse(data)
}

export async function updatePortfolioData(data: PortfolioData): Promise<void> {
  const filePath = path.join(DATA_DIR, "portfolio.json")
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
}

// Projects Data Service
export async function getAllProjects(): Promise<Project[]> {
  const filePath = path.join(DATA_DIR, "projects.json")
  const data = await fs.readFile(filePath, "utf-8")
  return JSON.parse(data)
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getAllProjects()
  return projects.find((p) => p.id === id) || null
}

export async function createProject(project: Omit<Project, "id">): Promise<Project> {
  const projects = await getAllProjects()
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
  }
  projects.push(newProject)
  await saveProjects(projects)
  return newProject
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  const projects = await getAllProjects()
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) return null

  projects[index] = { ...projects[index], ...updates }
  await saveProjects(projects)
  return projects[index]
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getAllProjects()
  const filtered = projects.filter((p) => p.id !== id)
  if (filtered.length === projects.length) return false

  await saveProjects(filtered)
  return true
}

async function saveProjects(projects: Project[]): Promise<void> {
  const filePath = path.join(DATA_DIR, "projects.json")
  await fs.writeFile(filePath, JSON.stringify(projects, null, 2), "utf-8")
}

// Blog Posts Data Service
export async function getAllBlogPosts(includeUnpublished = false): Promise<BlogPost[]> {
  const filePath = path.join(DATA_DIR, "blogs.json")
  const data = await fs.readFile(filePath, "utf-8")
  const posts: BlogPost[] = JSON.parse(data)

  if (includeUnpublished) {
    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }

  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts(true)
  return posts.find((p) => p.slug === slug) || null
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts(true)
  return posts.find((p) => p.id === id) || null
}

export async function createBlogPost(post: Omit<BlogPost, "id">): Promise<BlogPost> {
  const posts = await getAllBlogPosts(true)
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
  }
  posts.push(newPost)
  await saveBlogPosts(posts)
  return newPost
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts(true)
  const index = posts.findIndex((p) => p.id === id)
  if (index === -1) return null

  posts[index] = { ...posts[index], ...updates }
  await saveBlogPosts(posts)
  return posts[index]
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const posts = await getAllBlogPosts(true)
  const filtered = posts.filter((p) => p.id !== id)
  if (filtered.length === posts.length) return false

  await saveBlogPosts(filtered)
  return true
}

async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  const filePath = path.join(DATA_DIR, "blogs.json")
  await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf-8")
}
