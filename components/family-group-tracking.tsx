"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface FamilyMember {
  id: string
  name: string
  avatar: string
  nutrients: {
    [key: string]: {
      current: number
      target: number
    }
  }
}

export function FamilyGroupTracking() {
  const [familyMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "Parent 1",
      avatar: "/placeholder.svg?height=40&width=40",
      nutrients: {
        calcium: { current: 800, target: 1000 },
        protein: { current: 60, target: 70 },
        vitaminD: { current: 15, target: 20 },
      },
    },
    {
      id: "2",
      name: "Parent 2",
      avatar: "/placeholder.svg?height=40&width=40",
      nutrients: {
        calcium: { current: 900, target: 1000 },
        protein: { current: 65, target: 70 },
        vitaminD: { current: 18, target: 20 },
      },
    },
    {
      id: "3",
      name: "Child 1",
      avatar: "/placeholder.svg?height=40&width=40",
      nutrients: {
        calcium: { current: 700, target: 1000 },
        protein: { current: 40, target: 50 },
        vitaminD: { current: 10, target: 15 },
      },
    },
    {
      id: "4",
      name: "Child 2",
      avatar: "/placeholder.svg?height=40&width=40",
      nutrients: {
        calcium: { current: 600, target: 1000 },
        protein: { current: 35, target: 50 },
        vitaminD: { current: 8, target: 15 },
      },
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Family Nutrition Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calcium">
          <TabsList>
            <TabsTrigger value="calcium">Calcium</TabsTrigger>
            <TabsTrigger value="protein">Protein</TabsTrigger>
            <TabsTrigger value="vitaminD">Vitamin D</TabsTrigger>
          </TabsList>
          {["calcium", "protein", "vitaminD"].map((nutrient) => (
            <TabsContent key={nutrient} value={nutrient}>
              {familyMembers.map((member) => (
                <div key={member.id} className="mb-4">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                  </div>
                  <Progress
                    value={(member.nutrients[nutrient].current / member.nutrients[nutrient].target) * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>
                      {member.nutrients[nutrient].current} / {member.nutrients[nutrient].target}
                    </span>
                    <span>
                      {Math.round((member.nutrients[nutrient].current / member.nutrients[nutrient].target) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

