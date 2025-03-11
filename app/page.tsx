import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs"
import { AuthAwareCTAButton } from "@/components/auth-aware-cta-button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-teal-500">NutrientTracker</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <SignedIn>
              <UserButton />

            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Track Your Nutrients, Optimize Your Health
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    NutrientTracker helps you understand your body's needs and track your daily intake with AI-powered
                    insights and 3D visualizations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <AuthAwareCTAButton />
                  <Link href="/intro">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-full bg-gradient-to-b from-teal-500/20 to-teal-500/0 p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-[300px] w-[300px] rounded-full bg-muted/80 shadow-lg" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/nutrient-visualization.svg"
                      alt="3D Nutrient Visualization"
                      className="h-[280px] w-[280px] rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/20">
                  <svg
                    className="h-8 w-8 text-teal-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                    <path d="M21.18 10.2c-1.64.42-3.16.32-4.46-.24" />
                    <path d="M3.6 9.4c.9-2.2 3.16-3.63 5.7-3.63" />
                    <path d="M10.05 14.05 7.93 16.17" />
                    <path d="m14.05 14.05 2.12 2.12" />
                    <path d="m10.05 10.05-2.12-2.12" />
                    <path d="m14.05 10.05 2.12-2.12" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Personalized Tracking</h3>
                  <p className="text-muted-foreground">
                    Get personalized nutrient recommendations based on your age, weight, activity level, and goals.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/20">
                  <svg
                    className="h-8 w-8 text-teal-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">AI-Powered Insights</h3>
                  <p className="text-muted-foreground">
                    Our AI analyzes your eating patterns and provides actionable insights to improve your nutrition.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/20">
                  <svg
                    className="h-8 w-8 text-teal-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <path d="M12 22.5V12" />
                    <path d="m17 8-5 4-5-4" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">3D Visualization</h3>
                  <p className="text-muted-foreground">
                    See how nutrients affect your body with our interactive 3D body model visualization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 NutrientTracker. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

