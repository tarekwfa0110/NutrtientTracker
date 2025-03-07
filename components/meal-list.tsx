"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

export function MealList() {
  const [meals, setMeals] = useState<any[]>([])

  useEffect(() => {
    // Mock data - in a real app, this would come from your API
    const mockMeals = [
      {
        id: 1,
        time: "08:30 AM",
        label: "Breakfast",
        items: [
          {
            id: 1,
            name: "Eggs, scrambled",
            calories: 198,
            protein: 13.5,
            image: "/placeholder.svg?height=60&width=60",
          },
          {
            id: 2,
            name: "Whole wheat toast",
            calories: 75,
            protein: 3.6,
            image: "/placeholder.svg?height=60&width=60",
          },
          {
            id: 3,
            name: "Orange juice",
            calories: 45,
            protein: 0.7,
            image: "/placeholder.svg?height=60&width=60",
          },
        ],
      },
      {
        id: 2,
        time: "12:15 PM",
        label: "Lunch",
        items: [
          {
            id: 4,
            name: "Grilled chicken sandwich",
            calories: 350,
            protein: 28,
            image: "/placeholder.svg?height=60&width=60",
          },
          {
            id: 5,
            name: "Side salad",
            calories: 70,
            protein: 2,
            image: "/placeholder.svg?height=60&width=60",
          },
        ],
      },
    ]

    setMeals(mockMeals)
  }, [])

  const handleRemoveItem = (mealId: number, itemId: number) => {
    setMeals((prevMeals) =>
      prevMeals
        .map((meal) => {
          if (meal.id === mealId) {
            return {
              ...meal,
              items: meal.items.filter((item: any) => item.id !== itemId),
            }
          }
          return meal
        })
        .filter((meal) => meal.items.length > 0),
    )
  }

  if (meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">No meals logged today</p>
        <Button className="mt-4">Log Your First Meal</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <Card key={meal.id}>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{meal.label}</h3>
                <p className="text-sm text-muted-foreground">{meal.time}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {meal.items.reduce((sum: number, item: any) => sum + item.calories, 0)} kcal
                </p>
                <p className="text-sm text-muted-foreground">
                  {meal.items.reduce((sum: number, item: any) => sum + item.protein, 0)}g protein
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {meal.items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex items-center">
                    <div className="mr-3 h-12 w-12 overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.calories} kcal | {item.protein}g protein
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(meal.id, item.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

