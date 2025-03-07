"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveHeatMap } from "@nivo/heatmap"

interface MealPatternAnalysisProps {
  mealHistory: any[] // This would be the user's meal history
}

export function MealPatternAnalysis({ mealHistory }: MealPatternAnalysisProps) {
  const [patterns, setPatterns] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would be an API call to analyze meal patterns
    const mockPatterns = {
      protein: {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: [
          { day: "Mon", "06:00": 10, "12:00": 30, "18:00": 40 },
          { day: "Tue", "06:00": 15, "12:00": 25, "18:00": 35 },
          { day: "Wed", "06:00": 5, "12:00": 35, "18:00": 45 },
          { day: "Thu", "06:00": 20, "12:00": 20, "18:00": 30 },
          { day: "Fri", "06:00": 10, "12:00": 30, "18:00": 40 },
          { day: "Sat", "06:00": 5, "12:00": 15, "18:00": 25 },
          { day: "Sun", "06:00": 5, "12:00": 20, "18:00": 30 },
        ],
        comment:
          "You skimp on protein during weekends. Consider adding more protein-rich snacks on Saturdays and Sundays.",
      },
      sugar: {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: [
          { day: "Mon", "06:00": 5, "12:00": 10, "18:00": 25 },
          { day: "Tue", "06:00": 10, "12:00": 15, "18:00": 20 },
          { day: "Wed", "06:00": 5, "12:00": 20, "18:00": 30 },
          { day: "Thu", "06:00": 15, "12:00": 10, "18:00": 25 },
          { day: "Fri", "06:00": 10, "12:00": 15, "18:00": 35 },
          { day: "Sat", "06:00": 20, "12:00": 25, "18:00": 40 },
          { day: "Sun", "06:00": 15, "12:00": 20, "18:00": 35 },
        ],
        comment:
          "You consume 60% of your sugar after 6 PM. Try to reduce evening snacks or opt for lower-sugar alternatives.",
      },
    }

    setPatterns(mockPatterns)
  }, [mealHistory])

  if (!patterns) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal Pattern Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="protein">
          <TabsList>
            <TabsTrigger value="protein">Protein</TabsTrigger>
            <TabsTrigger value="sugar">Sugar</TabsTrigger>
          </TabsList>
          {Object.entries(patterns).map(([nutrient, data]: [string, any]) => (
            <TabsContent key={nutrient} value={nutrient}>
              <div className="h-[300px]">
                <ResponsiveHeatMap
                  data={data.data}
                  keys={["06:00", "12:00", "18:00"]}
                  indexBy="day"
                  margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
                  colors={{
                    type: "sequential",
                    scheme: nutrient === "protein" ? "blues" : "reds",
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -90,
                    legend: "Day",
                    legendPosition: "middle",
                    legendOffset: 46,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Time",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  cellOpacity={1}
                  cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
                  labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{data.comment}</p>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

