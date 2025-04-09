"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export function GuestLoginButton() {
  const router = useRouter()

  const handleGuestLogin = () => {
    // Store guest status in localStorage
    localStorage.setItem("isGuest", "true")
    // Redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <Button
      onClick={handleGuestLogin}
      variant="outline"
      className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-6 rounded-lg text-xl group relative overflow-hidden"
    >
      <span className="relative z-10 flex items-center">
        <User className="mr-2 h-5 w-5" />
        CONTINUE AS GUEST
      </span>
      <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
    </Button>
  )
} 