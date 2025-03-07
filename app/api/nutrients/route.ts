import { NextResponse } from "next/server"

// Mock API endpoint for nutrient calculations
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { age, gender, weight, height, activityLevel, pregnant } = body

    // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
    let bmr = 0
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // Apply activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      active: 1.5,
      athlete: 1.8,
    }

    const multiplier = activityMultipliers[activityLevel as keyof typeof activityMultipliers]
    let calories = Math.round(bmr * multiplier)

    // Adjust for pregnancy if applicable
    if (pregnant) {
      calories = Math.round(calories * 1.1)
    }

    // Calculate macronutrient targets
    const protein = Math.round((calories * 0.25) / 4) // 25% of calories from protein, 4 calories per gram
    const fat = Math.round((calories * 0.3) / 9) // 30% of calories from fat, 9 calories per gram
    const carbs = Math.round((calories * 0.45) / 4) // 45% of calories from carbs, 4 calories per gram

    // Calculate micronutrient targets based on RDI
    // These values would typically come from a more comprehensive database
    let vitaminC = 90 // mg
    let calcium = 1000 // mg
    let iron = 18 // mg
    let vitaminD = 20 // μg

    // Adjust for gender and pregnancy
    if (gender === "female") {
      iron = 18
      if (pregnant) {
        vitaminC = 120
        calcium = 1300
        iron = 27
        vitaminD = 25
      }
    } else {
      iron = 8
    }

    // Adjust for age
    if (age > 50) {
      calcium = 1200
      vitaminD = 25
    }

    return NextResponse.json({
      dailyTargets: {
        calories,
        protein,
        fat,
        carbs,
        vitaminC,
        calcium,
        iron,
        vitaminD,
      },
    })
  } catch (error) {
    console.error("Error calculating nutrient targets:", error)
    return NextResponse.json({ error: "Failed to calculate nutrient targets" }, { status: 500 })
  }
}

