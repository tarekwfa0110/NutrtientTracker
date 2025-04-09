"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

export default function NewMealPage() {
  const router = useRouter()
  const [mealName, setMealName] = useState("")
  const [mealTime, setMealTime] = useState("")
  const [mealDate, setMealDate] = useState(new Date().toISOString().split('T')[0])
  const [mealItems, setMealItems] = useState([
    { name: "", calories: "", protein: "", carbs: "", fat: "" }
  ])

  const handleAddItem = () => {
    setMealItems([...mealItems, { name: "", calories: "", protein: "", carbs: "", fat: "" }])
  }

  const handleRemoveItem = (index: number) => {
    setMealItems(mealItems.filter((_, i) => i !== index))
  }

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...mealItems]
    newItems[index] = { ...newItems[index], [field]: value }
    setMealItems(newItems)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log({
      name: mealName,
      time: mealTime,
      date: mealDate,
      items: mealItems
    })
    router.push("/dashboard/meals")
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Meal</h1>
          <p className="text-muted-foreground">
            Track your nutrition by adding meals and their components
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Meal Details</CardTitle>
              <CardDescription>
                Enter the basic information about your meal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Meal Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Breakfast, Lunch, Dinner"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={mealTime}
                    onChange={(e) => setMealTime(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={mealDate}
                    onChange={(e) => setMealDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meal Items</CardTitle>
              <CardDescription>
                Add the individual food items that make up your meal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {mealItems.map((item, index) => (
                <div key={index} className="space-y-4 border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Item {index + 1}</h3>
                    {mealItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`item-name-${index}`}>Food Name</Label>
                    <Input
                      id={`item-name-${index}`}
                      placeholder="e.g., Grilled Chicken"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, "name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`calories-${index}`}>Calories</Label>
                      <Input
                        id={`calories-${index}`}
                        type="number"
                        placeholder="kcal"
                        value={item.calories}
                        onChange={(e) => handleItemChange(index, "calories", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`protein-${index}`}>Protein (g)</Label>
                      <Input
                        id={`protein-${index}`}
                        type="number"
                        placeholder="g"
                        value={item.protein}
                        onChange={(e) => handleItemChange(index, "protein", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`carbs-${index}`}>Carbs (g)</Label>
                      <Input
                        id={`carbs-${index}`}
                        type="number"
                        placeholder="g"
                        value={item.carbs}
                        onChange={(e) => handleItemChange(index, "carbs", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`fat-${index}`}>Fat (g)</Label>
                      <Input
                        id={`fat-${index}`}
                        type="number"
                        placeholder="g"
                        value={item.fat}
                        onChange={(e) => handleItemChange(index, "fat", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleAddItem}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Item
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/meals")}
            >
              Cancel
            </Button>
            <Button type="submit">Save Meal</Button>
          </div>
        </form>
      </div>
    </div>
  )
} 