import { NextResponse } from "next/server"

// Mock API endpoint for food search
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    // In a real app, this would call the Edamam API
    // const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID
    // const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY
    // const response = await fetch(
    //   `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${encodeURIComponent(query)}`
    // )
    // const data = await response.json()

    // Mock response data
    const mockResults = [
      {
        food: {
          foodId: "food_bhpradua77pk16aipcvzeayg732r",
          label: "Eggs, scrambled",
          nutrients: {
            ENERC_KCAL: 198,
            PROCNT: 13.5,
            FAT: 15.2,
            CHOCDF: 1.3,
            CA: 99,
            VITC: 0,
          },
          image: "https://www.edamam.com/food-img/e16/e16a4ad1c0ac3fa62fce66d2519d1620.jpg",
        },
      },
      {
        food: {
          foodId: "food_a3049hmbqj9qk1b07l0yvat4uk3r",
          label: "Whole wheat toast",
          nutrients: {
            ENERC_KCAL: 75,
            PROCNT: 3.6,
            FAT: 1.1,
            CHOCDF: 13.8,
            CA: 25,
            VITC: 0,
          },
          image: "https://www.edamam.com/food-img/886/886960f6ce6ccec5b9163bacf2996853.jpg",
        },
      },
      {
        food: {
          foodId: "food_bv3hog1bd59n0ibc1iwbcax2g8xn",
          label: "Orange juice",
          nutrients: {
            ENERC_KCAL: 45,
            PROCNT: 0.7,
            FAT: 0.2,
            CHOCDF: 10.4,
            CA: 11,
            VITC: 49.4,
          },
          image: "https://www.edamam.com/food-img/011/011c0c3b0f3865bde0f3b4c4b56b2c4d.jpg",
        },
      },
    ]

    return NextResponse.json({ hints: mockResults })
  } catch (error) {
    console.error("Error searching for food:", error)
    return NextResponse.json({ error: "Failed to search for food" }, { status: 500 })
  }
}

