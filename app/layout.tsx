import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { ThemeProvider } from "@/components/theme-provider"
import { LoadingProvider } from "@/context/LoadingContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NutrientTracker - Optimize Your Daily Nutrition",
  description: "Track your daily nutrient intake with AI-powered insights and 3D visualizations",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <LoadingProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className} suppressHydrationWarning>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </LoadingProvider>
    </ClerkProvider>
  )
}