"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TestTube } from "lucide-react"

interface CTASectionProps {
  onNext: () => void
}

export function CTASection({ onNext }: CTASectionProps) {
  const [glitching, setGlitching] = useState(false)

  const handleClick = () => {
    setGlitching(true)
    setTimeout(() => {
      onNext()
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <AnimatePresence>
        {glitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-black"
          >
            <div className="h-full w-full flex flex-col items-center justify-center">
              <div className="glitch-text text-4xl font-mono text-neon-green mb-8">INITIALIZING BIOHACK SEQUENCE</div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <div
                  className="w-3 h-3 bg-neon-green rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-neon-green rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-0 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Become the Protagonist</h2>
          <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">
            Your cells are waiting for the upgrade they deserve
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gray-900 p-8 rounded-lg border border-gray-800"
          >
            <h3 className="text-2xl font-bold mb-4 text-neon-pink">Before NutrientTracker</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                Flying blind with generic nutrition advice
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                Wasting money on supplements you don't need
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                Feeling tired despite "eating healthy"
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                Invisible deficiencies sabotaging your health
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-gray-900 p-8 rounded-lg border border-gray-800"
          >
            <h3 className="text-2xl font-bold mb-4 text-teal-500">After NutrientTracker</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3"></span>
                Precision nutrition tailored to your biology
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3"></span>
                Visual confirmation as your body optimizes
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3"></span>
                Energy levels you haven't felt since childhood
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3"></span>
                Data-driven decisions that actually work
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleClick}
            className="bg-neon-pink text-black hover:bg-neon-pink/90 px-8 py-6 rounded-lg text-xl group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <TestTube className="mr-2 h-5 w-5" />
              BEGIN BIOHACKING EXPERIMENT →
            </span>
            <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-8 text-sm opacity-60"
        >
          By continuing, you agree to let us analyze your nutritional data for science.
          <br />
          No actual biohacking will occur. Probably.
        </motion.p>
      </div>
    </div>
  )
}

