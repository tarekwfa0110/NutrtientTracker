"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export default function NutritionPage() {
  const { user } = useUser()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Mock data - in a real app, this would come from an API
  const dailyGoals = {
    calories: 2200,
    protein: 120,
    carbs: 275,
    fat: 73,
    fiber: 30,
    sugar: 50,
    sodium: 2300,
    cholesterol: 300,
  }

  const currentIntake = {
    calories: 1876,
    protein: 86,
    carbs: 212,
    fat: 48,
    fiber: 18,
    sugar: 42,
    sodium: 1800,
    cholesterol: 250,
  }

  const vitamins = [
    { name: "Vitamin A", current: 80, target: 100, unit: "mcg" },
    { name: "Vitamin C", current: 75, target: 90, unit: "mg" },
    { name: "Vitamin D", current: 15, target: 20, unit: "mcg" },
    { name: "Vitamin E", current: 12, target: 15, unit: "mg" },
    { name: "Vitamin K", current: 90, target: 120, unit: "mcg" },
  ]

  const minerals = [
    { name: "Calcium", current: 800, target: 1000, unit: "mg" },
    { name: "Iron", current: 12, target: 18, unit: "mg" },
    { name: "Magnesium", current: 280, target: 400, unit: "mg" },
    { name: "Potassium", current: 2500, target: 3500, unit: "mg" },
    { name: "Zinc", current: 8, target: 11, unit: "mg" },
  ]

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 100) return "text-green-500"
    if (percentage >= 75) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Nutrition Analysis</h1>
            <p className="text-muted-foreground">
              Detailed insights into your nutritional intake
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
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
        </div>

        <Tabs defaultValue="macros" className="space-y-4">
          <TabsList>
            <TabsTrigger value="macros">Macronutrients</TabsTrigger>
            <TabsTrigger value="micros">Micronutrients</TabsTrigger>
            <TabsTrigger value="insights">Nutrition Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="macros" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(currentIntake).map(([key, value]) => (
                <Card key={key}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium capitalize">
                      {key}
                    </CardTitle>
                    <div className={`h-4 w-4 rounded-full ${getProgressColor(value, dailyGoals[key as keyof typeof dailyGoals])}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    <p className="text-xs text-muted-foreground">
                      of {dailyGoals[key as keyof typeof dailyGoals]} daily goal
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="micros" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Vitamins</CardTitle>
                  <CardDescription>Daily vitamin intake</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vitamins.map((vitamin) => (
                    <div key={vitamin.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{vitamin.name}</span>
                        <span className={getProgressColor(vitamin.current, vitamin.target)}>
                          {vitamin.current} / {vitamin.target} {vitamin.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            vitamin.current >= vitamin.target ? "bg-green-500" : "bg-yellow-500"
                          }`}
                          style={{ width: `${Math.min((vitamin.current / vitamin.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Minerals</CardTitle>
                  <CardDescription>Daily mineral intake</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {minerals.map((mineral) => (
                    <div key={mineral.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{mineral.name}</span>
                        <span className={getProgressColor(mineral.current, mineral.target)}>
                          {mineral.current} / {mineral.target} {mineral.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            mineral.current >= mineral.target ? "bg-green-500" : "bg-yellow-500"
                          }`}
                          style={{ width: `${Math.min((mineral.current / mineral.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                  <CardDescription>Nutritional aspects that need attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Low Fiber Intake</h4>
                      <p className="text-sm text-muted-foreground">
                        Consider adding more whole grains, fruits, and vegetables to your diet.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Vitamin D Deficiency</h4>
                      <p className="text-sm text-muted-foreground">
                        Try to include more fatty fish, egg yolks, or consider a supplement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Positive Trends</CardTitle>
                  <CardDescription>Nutritional aspects you're doing well in</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Protein Intake</h4>
                      <p className="text-sm text-muted-foreground">
                        You're consistently meeting your protein goals. Keep it up!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Sodium Control</h4>
                      <p className="text-sm text-muted-foreground">
                        Your sodium intake is well within healthy limits.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 