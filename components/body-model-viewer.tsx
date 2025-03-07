"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface BodyModelViewerProps {
  userData?: {
    age: number
    gender: string
    weight: number
    height: number
    activityLevel: string
    pregnant: boolean
  }
  nutrients?: {
    current: {
      calories: number
      protein: number
      carbs: number
      fat: number
      vitaminC: number
      calcium: number
      iron: number
      vitaminD: number
    }
    target: {
      calories: number
      protein: number
      carbs: number
      fat: number
      vitaminC: number
      calcium: number
      iron: number
      vitaminD: number
    }
  }
}

export function BodyModelViewer({ userData, nutrients }: BodyModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Set up scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f5f5)

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(0, 10, 5)
    scene.add(directionalLight)

    // Create a simple human figure
    const createHumanFigure = () => {
      const group = new THREE.Group()

      // Calculate proportions based on user data if available
      const height = userData ? userData.height / 100 : 1.7
      const width = userData ? (userData.weight / 70) * 0.5 : 0.5

      // Head
      const headGeometry = new THREE.SphereGeometry(0.25, 32, 32)
      const headMaterial = new THREE.MeshStandardMaterial({ color: 0xf5d0c5 })
      const head = new THREE.Mesh(headGeometry, headMaterial)
      head.position.y = height * 0.8
      group.add(head)

      // Torso
      const torsoGeometry = new THREE.CylinderGeometry(width * 0.7, width * 0.6, height * 0.4, 32)
      const torsoMaterial = new THREE.MeshStandardMaterial({ color: 0x2dd4bf })
      const torso = new THREE.Mesh(torsoGeometry, torsoMaterial)
      torso.position.y = height * 0.5
      group.add(torso)

      // Arms
      const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, height * 0.4, 32)
      const armMaterial = new THREE.MeshStandardMaterial({ color: 0xf5d0c5 })

      const leftArm = new THREE.Mesh(armGeometry, armMaterial)
      leftArm.position.set(width * 0.9, height * 0.5, 0)
      leftArm.rotation.z = Math.PI / 6
      group.add(leftArm)

      const rightArm = new THREE.Mesh(armGeometry, armMaterial)
      rightArm.position.set(-width * 0.9, height * 0.5, 0)
      rightArm.rotation.z = -Math.PI / 6
      group.add(rightArm)

      // Legs
      const legGeometry = new THREE.CylinderGeometry(0.15, 0.1, height * 0.5, 32)
      const legMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82f6 })

      const leftLeg = new THREE.Mesh(legGeometry, legMaterial)
      leftLeg.position.set(width * 0.3, height * 0.15, 0)
      group.add(leftLeg)

      const rightLeg = new THREE.Mesh(legGeometry, legMaterial)
      rightLeg.position.set(-width * 0.3, height * 0.15, 0)
      group.add(rightLeg)

      // If nutrients data is available, color organs based on nutrient levels
      if (nutrients) {
        // Bones (affected by calcium and vitamin D)
        const calciumLevel = (nutrients.current.calcium / nutrients.target.calcium) * 100
        const vitaminDLevel = (nutrients.current.vitaminD / nutrients.target.vitaminD) * 100

        const boneHealth = (calciumLevel + vitaminDLevel) / 2
        const boneColor = boneHealth > 70 ? 0x2dd4bf : boneHealth > 40 ? 0xfcd34d : 0xef4444

        const boneGeometry = new THREE.BoxGeometry(0.05, height * 0.7, 0.05)
        const boneMaterial = new THREE.MeshStandardMaterial({ color: boneColor })
        const bone = new THREE.Mesh(boneGeometry, boneMaterial)
        bone.position.y = height * 0.4
        group.add(bone)

        // Heart (affected by iron)
        const ironLevel = (nutrients.current.iron / nutrients.target.iron) * 100
        const heartColor = ironLevel > 70 ? 0x2dd4bf : ironLevel > 40 ? 0xfcd34d : 0xef4444

        const heartGeometry = new THREE.SphereGeometry(0.15, 32, 32)
        const heartMaterial = new THREE.MeshStandardMaterial({ color: heartColor })
        const heart = new THREE.Mesh(heartGeometry, heartMaterial)
        heart.position.set(width * 0.2, height * 0.6, width * 0.3)
        group.add(heart)

        // Immune system (affected by vitamin C)
        const vitaminCLevel = (nutrients.current.vitaminC / nutrients.target.vitaminC) * 100
        const immuneColor = vitaminCLevel > 70 ? 0x2dd4bf : vitaminCLevel > 40 ? 0xfcd34d : 0xef4444

        const immuneGeometry = new THREE.SphereGeometry(0.08, 32, 32)
        const immuneMaterial = new THREE.MeshStandardMaterial({ color: immuneColor })

        // Add several small spheres representing immune cells
        for (let i = 0; i < 5; i++) {
          const immune = new THREE.Mesh(immuneGeometry, immuneMaterial)
          immune.position.set(
            (Math.random() - 0.5) * width,
            height * 0.4 + (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * width,
          )
          group.add(immune)
        }
      }

      return group
    }

    const humanFigure = createHumanFigure()
    scene.add(humanFigure)

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 3
    controls.maxDistance = 10
    controls.enablePan = false

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
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
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [userData, nutrients])

  return <div ref={containerRef} className="h-full w-full" />
}

