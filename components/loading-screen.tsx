"use client"

import { motion } from "framer-motion"

export function LoadingScreen() {
  return (
    <div className="bg-black text-neon-green h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="text-6xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          🔬
        </motion.div>
        <h1 className="text-3xl font-mono tracking-wider">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
            SCANNING FOR NUTRITIONAL ANOMALIES
          </motion.span>
        </h1>
        <motion.div
          className="mt-4 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span
            className="inline-block w-3 h-3 bg-neon-green rounded-full animate-pulse"
            style={{ animationDelay: "0s" }}
          ></span>
          <span
            className="inline-block w-3 h-3 bg-neon-green rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="inline-block w-3 h-3 bg-neon-green rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </motion.div>
      </div>
    </div>
  )
}

