import { cookies } from "next/headers"

export interface User {
  id: string
  email: string
  name: string
}

const ADMIN_CREDENTIALS = {
  email: "admin@portfolio.com",
  password: "admin123", // In production, use hashed passwords
  user: {
    id: "1",
    email: "admin@portfolio.com",
    name: "Admin User",
  },
}

export async function login(email: string, password: string): Promise<User | null> {
  // Simple authentication logic
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return ADMIN_CREDENTIALS.user
  }
  return null
}

export async function setAuthCookie(user: User) {
  const cookieStore = await cookies()
  // Store user data in cookie (in production, use secure session tokens)
  cookieStore.set("auth-token", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

export async function getAuthUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("auth-token")

  if (!authToken) {
    return null
  }

  try {
    const user = JSON.parse(authToken.value)
    return user
  } catch {
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getAuthUser()
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}
