"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Zap } from "lucide-react"

interface Synergy {
  nutrients: string[]
  message: string
  explanation: string
  tip: string
}

interface NutrientAbsorptionOptimizerProps {
  currentMeal: {
    [key: string]: number
  }
}

export function NutrientAbsorptionOptimizer({ currentMeal }: NutrientAbsorptionOptimizerProps) {
  const [synergies, setSynergies] = useState<Synergy[]>([])

  useEffect(() => {
    // In a real app, this would be an API call to get synergies based on the current meal
    const mockSynergies: Synergy[] = [
      {
        nutrients: ["iron", "vitaminC"],
        message: "Add bell peppers to your lentils for 3x better iron absorption!",
        explanation: "Vitamin C enhances iron absorption by converting iron into a more easily absorbable form.",
        tip: "Try squeezing some lemon juice over your spinach salad.",
      },
      {
        nutrients: ["vitaminD", "calcium"],
        message: "Pair your calcium-rich foods with vitamin D for maximum bone-building power!",
        explanation: "Vitamin D helps your body absorb calcium more effectively.",
        tip: "Consider having your yogurt outside for some natural vitamin D from sunlight.",
      },
      {
        nutrients: ["vitaminA", "fat"],
        message: "Add a touch of healthy fat to unlock the full potential of vitamin A!",
        explanation: "Vitamin A is fat-soluble, meaning it's best absorbed when consumed with fats.",
        tip: "Drizzle some olive oil on your carrot sticks for a nutrient-absorbing boost.",
      },
    ]

    setSynergies(
      mockSynergies.filter(
        (synergy) =>
          synergy.nutrients.some((nutrient) => currentMeal[nutrient] > 0) &&
          synergy.nutrients.some((nutrient) => !currentMeal[nutrient] || currentMeal[nutrient] === 0),
      ),
    )
  }, [currentMeal])

  if (synergies.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrient Absorption Optimizer</CardTitle>
      </CardHeader>
      <CardContent>
        {synergies.map((synergy, index) => (
          <Alert key={index} className="mb-4">
            <Zap className="h-4 w-4" />
            <AlertTitle>{synergy.message}</AlertTitle>
            <AlertDescription>
              <p className="mt-2">{synergy.explanation}</p>
              <p className="mt-2 font-semibold">Pro Tip: {synergy.tip}</p>
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}

