import { NextResponse } from "next/server"

// Mock API endpoint for meals
export async function GET(request: Request) {
  try {
    // In a real app, this would fetch from Supabase
    // const supabase = createClient(...)
    // const { data, error } = await supabase
    //   .from('meals')
    //   .select('*')
    //   .eq('user_id', userId)
    //   .order('logged_at', { ascending: false })

    // Mock response data
    const mockMeals = [
      {
        id: 1,
        time: "08:30 AM",
        label: "Breakfast",
        items: [
          {
            id: 1,
            name: "Eggs, scrambled",
            calories: 198,
            protein: 13.5,
            image: "https://www.edamam.com/food-img/e16/e16a4ad1c0ac3fa62fce66d2519d1620.jpg",
          },
          {
            id: 2,
            name: "Whole wheat toast",
            calories: 75,
            protein: 3.6,
            image: "https://www.edamam.com/food-img/886/886960f6ce6ccec5b9163bacf2996853.jpg",
          },
          {
            id: 3,
            name: "Orange juice",
            calories: 45,
            protein: 0.7,
            image: "https://www.edamam.com/food-img/011/011c0c3b0f3865bde0f3b4c4b56b2c4d.jpg",
          },
        ],
      },
      {
        id: 2,
        time: "12:15 PM",
        label: "Lunch",
        items: [
          {
            id: 4,
            name: "Grilled chicken sandwich",
            calories: 350,
            protein: 28,
            image: "https://www.edamam.com/food-img/c7d/c7dbd1846c5d8e1efa0dfa7a31f33c53.jpg",
          },
          {
            id: 5,
            name: "Side salad",
            calories: 70,
            protein: 2,
            image: "https://www.edamam.com/food-img/a33/a332121d5a03a9c98b8faf84c2b10952.jpg",
          },
        ],
      },
    ]

    return NextResponse.json({ meals: mockMeals })
  } catch (error) {
    console.error("Error fetching meals:", error)
    return NextResponse.json({ error: "Failed to fetch meals" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { foodData } = body

    // In a real app, this would save to Supabase
    // const supabase = createClient(...)
    // const { data, error } = await supabase
    //   .from('meals')
    //   .insert({
    //     user_id: userId,
    //     food_data: foodData,
    //     logged_at: new Date().toISOString()
    //   })

    return NextResponse.json({ success: true, message: "Meal logged successfully" })
  } catch (error) {
    console.error("Error logging meal:", error)
    return NextResponse.json({ error: "Failed to log meal" }, { status: 500 })
  }
}

