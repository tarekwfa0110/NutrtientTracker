"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LoadingScreen } from "@/components/loading-screen"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { CTASection } from "@/components/cta-section"

export default function IntroPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show loading screen for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/onboarding")
    }
  }

  const handleSkip = () => {
    router.push("/onboarding")
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-4 right-4 z-50">
        <Button variant="ghost" className="text-white hover:text-white/80" onClick={handleSkip}>
          Skip Intro
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <HeroSection onNext={handleNext} />
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            key="problem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <ProblemSection onNext={handleNext} />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="how-it-works"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <HowItWorksSection onNext={handleNext} />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <CTASection onNext={handleNext} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-2 z-50">
        {[0, 1, 2, 3].map((step) => (
          <button
            key={step}
            className={`w-3 h-3 rounded-full ${currentStep === step ? "bg-neon-pink" : "bg-gray-600"}`}
            onClick={() => setCurrentStep(step)}
            aria-label={`Go to step ${step + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

