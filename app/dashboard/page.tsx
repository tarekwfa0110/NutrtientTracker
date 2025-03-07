"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, PlusCircle, TrendingUp, Apple, Utensils } from "lucide-react"
import { NutrientCard } from "@/components/nutrient-card"
import { NutrientRadarChart } from "@/components/nutrient-radar-chart"
import { BodyModelViewer } from "@/components/body-model-viewer"
import { FoodLogger } from "@/components/food-logger"
import { MealList } from "@/components/meal-list"
import { MealRecommendations } from "@/components/meal-recommendations"
import { NutrientAbsorptionOptimizer } from "@/components/nutrient-absorption-optimizer"
import { MealPatternAnalysis } from "@/components/meal-pattern-analysis"
import { BudgetNutritionPlanner } from "@/components/budget-nutrition-planner"
import { FamilyGroupTracking } from "@/components/family-group-tracking"
import { SymptomTrackerCorrelation } from "@/components/symptom-tracker-correlation"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useUser()
  const [showFoodLogger, setShowFoodLogger] = useState(false)
  const [nutrients, setNutrients] = useState({
    current: {
      calories: 1450,
      protein: 65,
      carbs: 180,
      fat: 45,
      vitaminC: 35,
      calcium: 600,
      iron: 8,
      vitaminD: 10,
    },
    target: {
      calories: 2200,
      protein: 120,
      carbs: 275,
      fat: 70,
      vitaminC: 90,
      calcium: 1000,
      iron: 18,
      vitaminD: 20,
    },
  })

  const mockUserData = {
    age: 32,
    gender: "male",
    weight: 75,
    height: 178,
    activityLevel: "active",
    pregnant: false,
  }

  const [currentMeal, setCurrentMeal] = useState({
    protein: 20,
    iron: 5,
    vitaminC: 0,
  })

  const [mealHistory, setMealHistory] = useState<any[]>([])

  useEffect(() => {
    // Fetch user's nutrient data
    // This is where you'd normally make an API call
    // For now, we'll use the mock data

    // Mock meal history data
    const mockMealHistory = [
      {
        date: "2023-01-01",
        meal: "Breakfast",
        calories: 200,
        fat: 10,
        carbs: 50,
        protein: 30,
        sodium: 20,
      },
      {
        date: "2023-01-02",
        meal: "Lunch",
        calories: 300,
        fat: 20,
        carbs: 60,
        protein: 40,
        sodium: 30,
      },
      {
        date: "2023-01-03",
        meal: "Snack",
        calories: 100,
        fat: 5,
        carbs: 20,
        protein: 10,
        sodium: 10,
      },
    ]
    setMealHistory(mockMealHistory)
  }, [])

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.firstName || "User"}</h1>
          <p className="text-muted-foreground">
            Track your nutrition, analyze your diet, and achieve your health goals.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Calories</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,876 / 2,200</div>
              <p className="text-xs text-muted-foreground">
                324 calories remaining
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Protein</CardTitle>
              <div className="h-4 w-4 rounded-full bg-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86g / 120g</div>
              <p className="text-xs text-muted-foreground">
                34g remaining
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carbs</CardTitle>
              <div className="h-4 w-4 rounded-full bg-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">212g / 275g</div>
              <p className="text-xs text-muted-foreground">
                63g remaining
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fat</CardTitle>
              <div className="h-4 w-4 rounded-full bg-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48g / 73g</div>
              <p className="text-xs text-muted-foreground">
                25g remaining
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Recent Meals
              </CardTitle>
              <CardDescription>Your recently logged meals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="border-b pb-2">
                <div className="font-medium">Breakfast</div>
                <div className="text-sm text-muted-foreground">Oatmeal with banana and honey</div>
                <div className="text-xs text-muted-foreground">342 kcal • 8:30 AM</div>
              </div>
              <div className="border-b pb-2">
                <div className="font-medium">Lunch</div>
                <div className="text-sm text-muted-foreground">Grilled chicken salad</div>
                <div className="text-xs text-muted-foreground">520 kcal • 12:45 PM</div>
              </div>
              <div>
                <div className="font-medium">Snack</div>
                <div className="text-sm text-muted-foreground">Greek yogurt with berries</div>
                <div className="text-xs text-muted-foreground">180 kcal • 3:15 PM</div>
              </div>
              <Button asChild className="w-full mt-2" variant="outline">
                <Link href="/dashboard/meals">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Meal
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5" />
                Nutrition Insights
              </CardTitle>
              <CardDescription>Insights from your recent diet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="border-b pb-2">
                <div className="font-medium">Low in Vitamin D</div>
                <div className="text-sm text-muted-foreground">
                  Consider adding fatty fish or eggs to your diet.
                </div>
              </div>
              <div className="border-b pb-2">
                <div className="font-medium">Great protein intake!</div>
                <div className="text-sm text-muted-foreground">
                  You've been consistently meeting your protein goals.
                </div>
              </div>
              <div>
                <div className="font-medium">Add more fiber</div>
                <div className="text-sm text-muted-foreground">
                  Try including more whole grains and vegetables.
                </div>
              </div>
              <Button asChild className="w-full mt-2" variant="outline">
                <Link href="/dashboard/insights">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View All Insights
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Add</CardTitle>
              <CardDescription>Quickly add common foods to your log</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between">
                  Banana <span className="text-muted-foreground">105 kcal</span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Coffee with milk <span className="text-muted-foreground">40 kcal</span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Hard-boiled egg <span className="text-muted-foreground">78 kcal</span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Apple <span className="text-muted-foreground">95 kcal</span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Protein shake <span className="text-muted-foreground">150 kcal</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

