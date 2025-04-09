"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Search, Filter, Calendar } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function MealsPage() {
  const { user } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Mock meal data - in a real app, this would come from an API
  const meals = [
    {
      id: 1,
      name: "Breakfast",
      time: "08:30",
      date: "2024-04-09",
      items: [
        { name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fat: 3 },
        { name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
        { name: "Greek Yogurt", calories: 100, protein: 10, carbs: 6, fat: 0 },
      ],
    },
    {
      id: 2,
      name: "Lunch",
      time: "12:45",
      date: "2024-04-09",
      items: [
        { name: "Grilled Chicken", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { name: "Quinoa", calories: 222, protein: 8, carbs: 39, fat: 3.6 },
        { name: "Mixed Vegetables", calories: 50, protein: 2, carbs: 10, fat: 0 },
      ],
    },
  ]

  const totalNutrients = meals.reduce(
    (acc, meal) => {
      meal.items.forEach((item) => {
        acc.calories += item.calories
        acc.protein += item.protein
        acc.carbs += item.carbs
        acc.fat += item.fat
      })
      return acc
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Meal Tracking</h1>
            <p className="text-muted-foreground">
              Track and manage your meals and nutrition intake
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/meals/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Meal
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalNutrients.calories}</div>
              <p className="text-xs text-muted-foreground">
                of 2,200 daily goal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Protein</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalNutrients.protein}g</div>
              <p className="text-xs text-muted-foreground">
                of 120g daily goal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carbs & Fat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalNutrients.carbs}g / {totalNutrients.fat}g
              </div>
              <p className="text-xs text-muted-foreground">
                of 275g / 73g daily goal
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Meals</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search meals..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    className="pl-8"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {meals.map((meal) => (
                <div key={meal.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{meal.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {meal.time} • {meal.date}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {meal.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">
                          {item.calories} kcal • P: {item.protein}g • C: {item.carbs}g • F: {item.fat}g
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 