"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Search, X, Utensils, Barcode, Plus } from "lucide-react"

interface FoodLoggerProps {
  onClose: () => void
}

export function FoodLogger({ onClose }: FoodLoggerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [predictions, setPredictions] = useState<string[]>([])

  useEffect(() => {
    // In a real app, this would be an API call to get predictions based on current time and user history
    const currentHour = new Date().getHours()
    if (currentHour >= 6 && currentHour < 11) {
      setPredictions(["Oatmeal", "Eggs and Toast", "Smoothie"])
    } else if (currentHour >= 11 && currentHour < 15) {
      setPredictions(["Chicken Salad", "Sandwich", "Soup"])
    } else if (currentHour >= 15 && currentHour < 19) {
      setPredictions(["Snack Bar", "Fruit", "Yogurt"])
    } else {
      setPredictions(["Grilled Chicken", "Pasta", "Stir Fry"])
    }
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Mock API call - in a real app, this would call your Edamam API
    setTimeout(() => {
      // Mock search results
      const mockResults = [
        {
          food: {
            label: searchQuery,
            nutrients: {
              ENERC_KCAL: Math.round(Math.random() * 500),
              PROCNT: Math.round(Math.random() * 30),
              FAT: Math.round(Math.random() * 20),
              CHOCDF: Math.round(Math.random() * 50),
              CA: Math.round(Math.random() * 100),
              VITC: Math.round(Math.random() * 50),
            },
            image: "/placeholder.svg?height=80&width=80",
          },
        },
        // ... add more mock results if needed
      ]

      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1000)
  }

  const handleAddFood = (food: any) => {
    // In a real app, this would add the food to the user's meal log
    console.log("Adding food:", food)

    // Mock adding to database
    setTimeout(() => {
      onClose()
    }, 500)
  }

  const handlePredictionSelect = (prediction: string) => {
    setSearchQuery(prediction)
    handleSearch({ preventDefault: () => {} } as React.FormEvent)
  }

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">
              <Search className="mr-2 h-4 w-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="scan">
              <Barcode className="mr-2 h-4 w-4" />
              Scan Barcode
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="mt-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search for a food (e.g., '2 eggs with toast')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isSearching}>
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
              <Button variant="outline" type="button" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </form>

            {predictions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Quick Add:</h4>
                <div className="flex flex-wrap gap-2">
                  {predictions.map((prediction, index) => (
                    <Button key={index} variant="outline" size="sm" onClick={() => handlePredictionSelect(prediction)}>
                      {prediction}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {isSearching ? (
              <div className="mt-4 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {searchResults.map((result, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center p-4">
                        <div className="mr-4 h-16 w-16 overflow-hidden rounded-md bg-muted">
                          <img
                            src={result.food.image || "/placeholder.svg"}
                            alt={result.food.label}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{result.food.label}</h4>
                          <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                            <span>{result.food.nutrients.ENERC_KCAL} kcal</span>
                            <span>{result.food.nutrients.PROCNT}g protein</span>
                            <span>{result.food.nutrients.CHOCDF}g carbs</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-2" onClick={() => handleAddFood(result.food)}>
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {searchResults.length === 0 && !isSearching && searchQuery && (
                  <div className="mt-4 text-center text-muted-foreground">
                    <Utensils className="mx-auto h-8 w-8" />
                    <p className="mt-2">No results found. Try a different search term.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="scan" className="mt-4">
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
              <Barcode className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-4 text-center text-muted-foreground">Scan a barcode to quickly add food items</p>
              <Button>Open Camera</Button>
              <p className="mt-4 text-xs text-muted-foreground">Note: This feature requires camera access</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

