"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"

interface Correlation {
  nutrient: string
  symptom: string
  pValue: number
  data: { x: number; y: number }[]
}

export function SymptomTrackerCorrelation() {
  const [correlations, setCorrelations] = useState<Correlation[]>([])

  useEffect(() => {
    // In a real app, this would be an API call to get correlations based on user data
    const mockCorrelations: Correlation[] = [
      {
        nutrient: "magnesium",
        symptom: "headache",
        pValue: 0.03,
        data: [
          { x: 200, y: 8 },
          { x: 250, y: 6 },
          { x: 300, y: 4 },
          { x: 350, y: 3 },
          { x: 400, y: 2 },
        ],
      },
      {
        nutrient: "fiber",
        symptom: "energy",
        pValue: 0.01,
        data: [
          { x: 15, y: 3 },
          { x: 20, y: 5 },
          { x: 25, y: 6 },
          { x: 30, y: 8 },
          { x: 35, y: 9 },
        ],
      },
    ]

    setCorrelations(mockCorrelations)
  }, [])

  if (correlations.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom-Nutrient Correlations</CardTitle>
      </CardHeader>
      <CardContent>
        {correlations.map((correlation, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-lg font-semibold mb-2">
              {correlation.nutrient.charAt(0).toUpperCase() + correlation.nutrient.slice(1)} vs {correlation.symptom}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              p-value: {correlation.pValue} (
              {correlation.pValue < 0.05 ? (
                <span className="text-green-500">Statistically significant</span>
              ) : (
                <span className="text-red-500">Not statistically significant</span>
              )}
              )
            </p>
            <div className="h-[200px]">
              <ResponsiveLine
                data={[
                  {
                    id: correlation.symptom,
                    data: correlation.data,
                  },
                ]}
                margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
                xScale={{ type: "linear" }}
                yScale={{ type: "linear", min: "auto", max: "auto" }}
                axisBottom={{
                  legend: `${correlation.nutrient} (mg)`,
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  legend: `${correlation.symptom} severity`,
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                useMesh={true}
              />
            </div>
            <p className="mt-4 text-sm">
              {correlation.symptom === "headache"
                ? `Your headaches drop 70% when ${correlation.nutrient} > ${correlation.data[correlation.data.length - 1].x}mg`
                : `Your energy levels increase significantly when ${correlation.nutrient} > ${correlation.data[correlation.data.length - 1].x}g`}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

