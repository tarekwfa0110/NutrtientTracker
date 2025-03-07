"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface HeroSectionProps {
  onNext: () => void
}

export function HeroSection({ onNext }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Set up scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(0, 10, 5)
    scene.add(directionalLight)

    // Create DNA helix
    const createDNAHelix = () => {
      const group = new THREE.Group()

      const curve1 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2, -2, 0),
        new THREE.Vector3(-1, -1, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(2, 2, 0),
      ])

      const curve2 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2, 2, 0),
        new THREE.Vector3(-1, 1, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, -1, 0),
        new THREE.Vector3(2, -2, 0),
      ])

      const points1 = curve1.getPoints(50)
      const points2 = curve2.getPoints(50)

      const geometry1 = new THREE.BufferGeometry().setFromPoints(points1)
      const geometry2 = new THREE.BufferGeometry().setFromPoints(points2)

      const material1 = new THREE.LineBasicMaterial({ color: 0x2dd4bf })
      const material2 = new THREE.LineBasicMaterial({ color: 0xff1493 })

      const line1 = new THREE.Line(geometry1, material1)
      const line2 = new THREE.Line(geometry2, material2)

      group.add(line1)
      group.add(line2)

      // Add connecting "rungs" between the strands
      for (let i = 0; i < points1.length; i += 5) {
        const rungGeometry = new THREE.BufferGeometry().setFromPoints([points1[i], points2[i]])
        const rungMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.5,
        })
        const rung = new THREE.Line(rungGeometry, rungMaterial)
        group.add(rung)
      }

      // Add nutrient particles
      const particleGroup = new THREE.Group()
      const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8)
      const particleMaterials = [
        new THREE.MeshPhongMaterial({ color: 0xff1493, emissive: 0xff1493, emissiveIntensity: 0.5 }), // Pink
        new THREE.MeshPhongMaterial({ color: 0x2dd4bf, emissive: 0x2dd4bf, emissiveIntensity: 0.5 }), // Teal
        new THREE.MeshPhongMaterial({ color: 0xfcd34d, emissive: 0xfcd34d, emissiveIntensity: 0.5 }), // Yellow
      ]

      for (let i = 0; i < 30; i++) {
        const particle = new THREE.Mesh(
          particleGeometry,
          particleMaterials[Math.floor(Math.random() * particleMaterials.length)],
        )

        const theta = Math.random() * Math.PI * 2
        const radius = 0.5 + Math.random() * 1.5
        particle.position.set(Math.cos(theta) * radius, Math.sin(theta) * radius, (Math.random() - 0.5) * 4)

        particleGroup.add(particle)
      }

      group.add(particleGroup)

      return { group, particleGroup }
    }

    const { group, particleGroup } = createDNAHelix()
    scene.add(group)

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 1

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the DNA
      group.rotation.y += 0.005

      // Animate particles
      particleGroup.children.forEach((particle, i) => {
        particle.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01
        particle.position.x += Math.cos(Date.now() * 0.001 + i) * 0.01

        // Random glitch effect
        if (Math.random() > 0.99) {
          particle.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3)
        }
      })

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" ref={containerRef}></div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 glitch-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          YOUR BODY IS LYING TO YOU
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl opacity-80 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          We hacked the <span className="text-neon-pink">nutritional matrix</span> to show
          <br />
          <span className="underline">exactly</span> what your cells are starving for.
        </motion.h2>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}>
          <Button
            onClick={onNext}
            className="bg-neon-pink text-black hover:bg-neon-pink/90 px-8 py-6 rounded-lg text-lg"
          >
            Reveal The Truth
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </motion.div>
    </div>
  )
}

