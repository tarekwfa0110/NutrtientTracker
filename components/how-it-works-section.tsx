"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scan, Activity, Zap } from "lucide-react"

interface HowItWorksSectionProps {
  onNext: () => void
}

export function HowItWorksSection({ onNext }: HowItWorksSectionProps) {
  const [activeTab, setActiveTab] = useState("scan")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
        <p className="text-xl opacity-80 max-w-2xl mx-auto">Three steps to nutritional enlightenment</p>
      </motion.div>

      <div className="w-full max-w-4xl">
        <Tabs defaultValue="scan" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-black border border-gray-800">
            <TabsTrigger value="scan" className="py-4 data-[state=active]:bg-neon-pink data-[state=active]:text-black">
              <Scan className="mr-2 h-5 w-5" />
              SCAN
            </TabsTrigger>
            <TabsTrigger value="track" className="py-4 data-[state=active]:bg-neon-pink data-[state=active]:text-black">
              <Activity className="mr-2 h-5 w-5" />
              TRACK
            </TabsTrigger>
            <TabsTrigger
              value="dominate"
              className="py-4 data-[state=active]:bg-neon-pink data-[state=active]:text-black"
            >
              <Zap className="mr-2 h-5 w-5" />
              DOMINATE
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 border border-gray-800 rounded-lg overflow-hidden">
            <TabsContent value="scan" className="p-0 m-0">
              <div className="grid md:grid-cols-2">
                <div className="bg-gray-900 p-8 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-xs"
                  >
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Body scan visualization"
                      className="w-full h-auto rounded-lg border border-neon-pink/30 glow-pink"
                    />
                  </motion.div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2 font-mono text-neon-pink">1. WE PROBE</h3>
                  <p className="text-xl mb-6">Full-body nutritional MRI (no hospital gown)</p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-neon-pink rounded-full mt-2 mr-3"></span>
                      Advanced algorithms analyze your body's unique needs
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-neon-pink rounded-full mt-2 mr-3"></span>
                      Identifies deficiencies other apps miss completely
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-neon-pink rounded-full mt-2 mr-3"></span>
                      Creates your digital nutritional twin
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="track" className="p-0 m-0">
              <div className="grid md:grid-cols-2">
                <div className="bg-gray-900 p-8 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-xs"
                  >
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Food tracking visualization"
                      className="w-full h-auto rounded-lg border border-neon-green/30 glow-green"
                    />
                  </motion.div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2 font-mono text-neon-green">2. YOU CONQUER</h3>
                  <p className="text-xl mb-6">Log meals faster than ordering Uber Eats</p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-neon-green rounded-full mt-2 mr-3"></span>
                      AI-powered food recognition - just snap a photo
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-neon-green rounded-full mt-2 mr-3"></span>
                      Watch nutrients explode into particles in real-time
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-neon-green rounded-full mt-2 mr-3"></span>
                      Instant feedback on how each meal affects your deficiencies
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dominate" className="p-0 m-0">
              <div className="grid md:grid-cols-2">
                <div className="bg-gray-900 p-8 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-xs"
                  >
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Body optimization visualization"
                      className="w-full h-auto rounded-lg border border-teal-500/30 glow-teal"
                    />
                  </motion.div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2 font-mono text-teal-500">3. YOUR CELLS CHEER</h3>
                  <p className="text-xl mb-6">Watch organs glow as deficiencies die</p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3"></span>
                      3D body model transforms from red to vibrant green
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3"></span>
                      Unlock achievements as your nutrition score rises
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3"></span>
                      Experience physical changes you can actually feel
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-12 flex justify-center">
          <Button onClick={onNext} className="bg-white text-black hover:bg-white/90 px-8 py-6 rounded-lg text-lg">
            I'm Ready
          </Button>
        </div>
      </div>
    </div>
  )
}

