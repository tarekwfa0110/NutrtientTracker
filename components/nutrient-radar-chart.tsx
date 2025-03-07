"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

interface NutrientRadarChartProps {
  nutrients: {
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

export function NutrientRadarChart({ nutrients }: NutrientRadarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Calculate percentages for each nutrient
    const percentages = {
      protein: Math.min(100, (nutrients.current.protein / nutrients.target.protein) * 100),
      carbs: Math.min(100, (nutrients.current.carbs / nutrients.target.carbs) * 100),
      fat: Math.min(100, (nutrients.current.fat / nutrients.target.fat) * 100),
      vitaminC: Math.min(100, (nutrients.current.vitaminC / nutrients.target.vitaminC) * 100),
      calcium: Math.min(100, (nutrients.current.calcium / nutrients.target.calcium) * 100),
      iron: Math.min(100, (nutrients.current.iron / nutrients.target.iron) * 100),
      vitaminD: Math.min(100, (nutrients.current.vitaminD / nutrients.target.vitaminD) * 100),
    }

    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Protein", "Carbs", "Fat", "Vitamin C", "Calcium", "Iron", "Vitamin D"],
        datasets: [
          {
            label: "Current Intake (%)",
            data: [
              percentages.protein,
              percentages.carbs,
              percentages.fat,
              percentages.vitaminC,
              percentages.calcium,
              percentages.iron,
              percentages.vitaminD,
            ],
            backgroundColor: "rgba(45, 212, 191, 0.2)",
            borderColor: "rgb(45, 212, 191)",
            pointBackgroundColor: "rgb(45, 212, 191)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(45, 212, 191)",
          },
          {
            label: "Target (100%)",
            data: [100, 100, 100, 100, 100, 100, 100],
            backgroundColor: "rgba(239, 68, 68, 0.0)",
            borderColor: "rgba(239, 68, 68, 0.5)",
            borderDash: [5, 5],
            pointBackgroundColor: "rgba(0, 0, 0, 0)",
            pointBorderColor: "rgba(0, 0, 0, 0)",
            pointHoverBackgroundColor: "rgba(0, 0, 0, 0)",
            pointHoverBorderColor: "rgba(0, 0, 0, 0)",
          },
        ],
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true,
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        maintainAspectRatio: false,
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [nutrients])

  return <canvas ref={chartRef} />
}

