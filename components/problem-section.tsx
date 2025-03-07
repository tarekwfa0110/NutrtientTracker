"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface ProblemSectionProps {
  onNext: () => void
}

export function ProblemSection({ onNext }: ProblemSectionProps) {
  const globeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!globeRef.current) return

    // Set up scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      globeRef.current.clientWidth / globeRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight)
    globeRef.current.appendChild(renderer.domElement)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(0, 10, 5)
    scene.add(directionalLight)

    // Create globe with deficiency points
    const createGlobe = () => {
      const group = new THREE.Group()

      // Create globe sphere
      const globeGeometry = new THREE.SphereGeometry(2, 32, 32)
      const globeMaterial = new THREE.MeshPhongMaterial({
        color: 0x111111,
        emissive: 0x222222,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      })
      const globe = new THREE.Mesh(globeGeometry, globeMaterial)
      group.add(globe)

      // Add deficiency points
      const deficiencyData = [
        { lat: 34, lng: -118, nutrient: "Vitamin D", color: 0xff1493 },
        { lat: 40, lng: -74, nutrient: "Iron", color: 0xff4444 },
        { lat: 51, lng: 0, nutrient: "Vitamin B12", color: 0xfcd34d },
        { lat: 35, lng: 139, nutrient: "Calcium", color: 0x2dd4bf },
        { lat: -33, lng: 151, nutrient: "Magnesium", color: 0xff1493 },
        { lat: 19, lng: 72, nutrient: "Zinc", color: 0xff4444 },
        { lat: -23, lng: -46, nutrient: "Vitamin C", color: 0xfcd34d },
        { lat: 55, lng: 37, nutrient: "Omega-3", color: 0x2dd4bf },
      ]

      deficiencyData.forEach((point) => {
        // Convert lat/lng to 3D coordinates
        const phi = (90 - point.lat) * (Math.PI / 180)
        const theta = (point.lng + 180) * (Math.PI / 180)

        const x = -2 * Math.sin(phi) * Math.cos(theta)
        const y = 2 * Math.cos(phi)
        const z = 2 * Math.sin(phi) * Math.sin(theta)

        // Create point
        const pointGeometry = new THREE.SphereGeometry(0.1, 16, 16)
        const pointMaterial = new THREE.MeshPhongMaterial({
          color: point.color,
          emissive: point.color,
          emissiveIntensity: 0.5,
        })
        const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial)
        pointMesh.position.set(x, y, z)

        // Add pulse effect
        const pulseGeometry = new THREE.SphereGeometry(0.12, 16, 16)
        const pulseMaterial = new THREE.MeshBasicMaterial({
          color: point.color,
          transparent: true,
          opacity: 0.4,
        })
        const pulseMesh = new THREE.Mesh(pulseGeometry, pulseMaterial)
        pulseMesh.position.set(x, y, z)
        pulseMesh.userData = {
          originalScale: 1,
          pulseSpeed: 0.5 + Math.random() * 0.5,
          nutrient: point.nutrient,
        }

        group.add(pointMesh)
        group.add(pulseMesh)
      })

      return { group, deficiencyPoints: group.children.filter((child) => child.userData?.nutrient) }
    }

    const { group, deficiencyPoints } = createGlobe()
    scene.add(group)

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Animate pulse effect for deficiency points
      deficiencyPoints.forEach((point) => {
        const pulse = point.userData.pulseSpeed
        point.scale.set(
          1 + 0.5 * Math.sin(Date.now() * 0.001 * pulse),
          1 + 0.5 * Math.sin(Date.now() * 0.001 * pulse),
          1 + 0.5 * Math.sin(Date.now() * 0.001 * pulse),
        )
      })

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!globeRef.current) return
      camera.aspect = globeRef.current.clientWidth / globeRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      if (globeRef.current && globeRef.current.contains(renderer.domElement)) {
        globeRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The Problem</h2>

          <div className="space-y-6 text-xl">
            <p className="font-mono">Your avocado toast won't save you.</p>

            <p className="font-mono">Generic nutrition apps treat you like a lab rat.</p>

            <p className="font-mono">
              We found <span className="text-neon-red font-bold">87%</span> of users have
              <span className="text-neon-red font-bold"> dangerous blind spots</span> in their vitamin intake.
            </p>

            <p className="font-mono">Your bones/muscles/brain are keeping score.</p>
          </div>

          <div className="mt-12">
            <Button
              onClick={onNext}
              className="bg-neon-pink text-black hover:bg-neon-pink/90 px-8 py-6 rounded-lg text-lg"
            >
              Show Me How
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 h-[400px] md:h-screen" ref={globeRef}></div>
    </div>
  )
}

