import { NextResponse } from "next/server"

function getMissingNutrients(current: { [key: string]: number }, target: { [key: string]: number }) {
  const missing: { [key: string]: number } = {}
  for (const nutrient in target) {
    const deficit = target[nutrient] - (current[nutrient] || 0)
    if (deficit > 0) {
      missing[nutrient] = deficit
    }
  }
  return missing
}

function getRecommendations(nutrients: { current: { [key: string]: number }; target: { [key: string]: number } }) {
  const missingNutrients = getMissingNutrients(nutrients.current, nutrients.target)

  // This is a simplified recommendation engine. In a real app, you'd have a more sophisticated algorithm
  // and a database of foods with their nutritional content.
  const recommendations = [
    {
      name: "Spinach and Feta Omelette",
      reason: `High in iron (you're missing ${missingNutrients.iron?.toFixed(1) || 0}mg) and protein`,
      ingredients: ["eggs", "spinach", "feta cheese"],
    },
    {
      name: "Salmon and Quinoa Bowl",
      reason: `Rich in protein and healthy fats. Helps with vitamin D (you need ${missingNutrients.vitaminD?.toFixed(1) || 0}μg more)`,
      ingredients: ["salmon", "quinoa", "avocado", "cherry tomatoes"],
    },
    {
      name: "Greek Yogurt Parfait",
      reason: `Boosts your calcium intake (${missingNutrients.calcium?.toFixed(1) || 0}mg needed) and adds protein`,
      ingredients: ["greek yogurt", "mixed berries", "honey", "almonds"],
    },
  ]

  return recommendations
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nutrients } = body

    const recommendations = getRecommendations(nutrients)

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("Error generating meal recommendations:", error)
    return NextResponse.json({ error: "Failed to generate meal recommendations" }, { status: 500 })
  }
}

