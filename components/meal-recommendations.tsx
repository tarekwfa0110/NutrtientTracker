"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight } from "lucide-react"

interface Meal {
  name: string
  reason: string
  ingredients: string[]
}

interface MealRecommendationsProps {
  nutrients: {
    current: {
      [key: string]: number
    }
    target: {
      [key: string]: number
    }
  }
}

export function MealRecommendations({ nutrients }: MealRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await fetch("/api/meal-recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nutrients }),
        })
        const data = await response.json()
        setRecommendations(data.recommendations || [])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching meal recommendations:", error)
        setRecommendations([])
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [nutrients])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex space-x-2">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-8 w-20" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (recommendations.length === 0) {
    return <p>No recommendations available at this time.</p>
  }

  return (
    <div className="space-y-4">
      {recommendations.map((meal, index) => (
        <Card key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-1">{meal.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{meal.reason}</p>
            <div className="flex flex-wrap gap-2">
              {meal.ingredients.map((ingredient, i) => (
                <span key={i} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                  {ingredient}
                </span>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-4">
              Add to meals <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

