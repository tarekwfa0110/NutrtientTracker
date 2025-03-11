"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs"
import { AuthAwareCTAButton } from "@/components/auth-aware-cta-button"

export default function Home() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (!isLoaded) return

    // If user is signed in, take them directly to dashboard
    if (isSignedIn) {
      router.push("/dashboard")
      return
    }

    // For first-time visitors, show the walkthrough
    router.push("/intro")
  }, [isLoaded, isSignedIn, router])

  // Show nothing while redirecting
  return null
}

