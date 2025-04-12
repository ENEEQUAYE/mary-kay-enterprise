"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode
  adminOnly?: boolean
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
    } else if (adminOnly && session.user.role !== "admin") {
      router.push("/")
    }
  }, [session, status, router, pathname, adminOnly])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (adminOnly && session.user.role !== "admin") {
    return null
  }

  return <>{children}</>
}
