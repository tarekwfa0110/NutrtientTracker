"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Save, Target } from "lucide-react"

export default function NutritionGoalsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("macros")

  // Mock data - in a real app, this would come from an API
  const [goals, setGoals] = useState({
    macros: {
      calories: 2200,
      protein: 120,
      carbs: 275,
      fat: 73,
    },
    micros: {
      fiber: 30,
      sugar: 50,
      sodium: 2300,
      cholesterol: 300,
    },
    vitamins: {
      vitaminA: 900,
      vitaminC: 90,
      vitaminD: 20,
      vitaminE: 15,
      vitaminK: 120,
    },
    minerals: {
      calcium: 1000,
      iron: 18,
      magnesium: 400,
      potassium: 3500,
      zinc: 11,
    },
  })

  const handleGoalChange = (category: string, key: string, value: number) => {
    setGoals((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
  }

  const handleSave = () => {
    // Here you would typically send the updated goals to your API
    console.log("Saving goals:", goals)
    router.push("/dashboard/nutrition")
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Nutrition Goals</h1>
          <p className="text-muted-foreground">
            Set and adjust your daily nutritional targets
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="macros">Macros</TabsTrigger>
            <TabsTrigger value="micros">Micros</TabsTrigger>
            <TabsTrigger value="vitamins">Vitamins</TabsTrigger>
            <TabsTrigger value="minerals">Minerals</TabsTrigger>
          </TabsList>

          <TabsContent value="macros">
            <Card>
              <CardHeader>
                <CardTitle>Macronutrient Goals</CardTitle>
                <CardDescription>
                  Set your daily macronutrient targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(goals.macros).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={key} className="capitalize">
                        {key}
                      </Label>
                      <span className="text-sm text-muted-foreground">
                        {value} {key === "calories" ? "kcal" : "g"}
                      </span>
                    </div>
                    <Slider
                      id={key}
                      value={[value]}
                      onValueChange={([newValue]) =>
                        handleGoalChange("macros", key, newValue)
                      }
                      min={0}
                      max={key === "calories" ? 5000 : 500}
                      step={key === "calories" ? 100 : 1}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="micros">
            <Card>
              <CardHeader>
                <CardTitle>Micronutrient Goals</CardTitle>
                <CardDescription>
                  Set your daily micronutrient targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(goals.micros).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={key} className="capitalize">
                        {key}
                      </Label>
                      <span className="text-sm text-muted-foreground">
                        {value} {key === "sodium" ? "mg" : "g"}
                      </span>
                    </div>
                    <Slider
                      id={key}
                      value={[value]}
                      onValueChange={([newValue]) =>
                        handleGoalChange("micros", key, newValue)
                      }
                      min={0}
                      max={key === "sodium" ? 5000 : 100}
                      step={key === "sodium" ? 100 : 1}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitamins">
            <Card>
              <CardHeader>
                <CardTitle>Vitamin Goals</CardTitle>
                <CardDescription>
                  Set your daily vitamin targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(goals.vitamins).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={key} className="capitalize">
                        {key.replace("vitamin", "Vitamin ")}
                      </Label>
                      <span className="text-sm text-muted-foreground">
                        {value} {key === "vitaminA" || key === "vitaminD" || key === "vitaminK" ? "mcg" : "mg"}
                      </span>
                    </div>
                    <Slider
                      id={key}
                      value={[value]}
                      onValueChange={([newValue]) =>
                        handleGoalChange("vitamins", key, newValue)
                      }
                      min={0}
                      max={2000}
                      step={10}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="minerals">
            <Card>
              <CardHeader>
                <CardTitle>Mineral Goals</CardTitle>
                <CardDescription>
                  Set your daily mineral targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(goals.minerals).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={key} className="capitalize">
                        {key}
                      </Label>
                      <span className="text-sm text-muted-foreground">
                        {value} {key === "potassium" ? "mg" : "mg"}
                      </span>
                    </div>
                    <Slider
                      id={key}
                      value={[value]}
                      onValueChange={([newValue]) =>
                        handleGoalChange("minerals", key, newValue)
                      }
                      min={0}
                      max={key === "potassium" ? 5000 : 2000}
                      step={10}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/nutrition")}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Goals
          </Button>
        </div>
      </div>
    </div>
  )
} 