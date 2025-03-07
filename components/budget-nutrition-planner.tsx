"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface BudgetMeal {
  name: string
  cost: number
  nutrients: {
    [key: string]: number
  }
}

export function BudgetNutritionPlanner() {
  const [budget, setBudget] = useState(50)
  const [zipCode, setZipCode] = useState("")
  const [budgetMeals, setBudgetMeals] = useState<BudgetMeal[]>([])

  useEffect(() => {
    // In a real app, this would be an API call to get budget meals based on the user's location and nutritional needs
    const mockBudgetMeals: BudgetMeal[] = [
      {
        name: "Lentil and Vegetable Soup",
        cost: 2.5,
        nutrients: { protein: 15, fiber: 10, vitaminA: 20, iron: 15 },
      },
      {
        name: "Chicken and Brown Rice Bowl",
        cost: 3.75,
        nutrients: { protein: 25, fiber: 5, vitaminB: 15, zinc: 10 },
      },
      {
        name: "Greek Yogurt Parfait",
        cost: 2.0,
        nutrients: { protein: 20, calcium: 25, probiotics: 15 },
      },
      {
        name: "Spinach and Feta Omelette",
        cost: 2.25,
        nutrients: { protein: 18, vitaminK: 30, folate: 20, calcium: 15 },
      },
      {
        name: "Peanut Butter Banana Smoothie",
        cost: 1.75,
        nutrients: { protein: 10, potassium: 15, vitaminB6: 20, magnesium: 10 },
      },
    ]

    setBudgetMeals(mockBudgetMeals)
  }, [budget, zipCode])

  const handleSearch = () => {
    // In a real app, this would trigger an API call with the new budget and zip code
    console.log(`Searching for meals with budget $${budget} in ${zipCode}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Nutrition Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            placeholder="Weekly budget"
          />
          <Input value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Zip code" />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meal</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Key Nutrients</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgetMeals.map((meal, index) => (
              <TableRow key={index}>
                <TableCell>{meal.name}</TableCell>
                <TableCell>${meal.cost.toFixed(2)}</TableCell>
                <TableCell>
                  {Object.entries(meal.nutrients).map(([nutrient, value]) => (
                    <span key={nutrient} className="mr-2">
                      {nutrient}: {value}%
                    </span>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="mt-4 text-sm text-muted-foreground">
          Total weekly cost: ${budgetMeals.reduce((sum, meal) => sum + meal.cost, 0).toFixed(2)}
        </p>
      </CardContent>
    </Card>
  )
}

