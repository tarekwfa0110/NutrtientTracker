"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, TrendingUp, AlertTriangle, CheckCircle2, Lightbulb, Activity, Heart, Brain } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export default function InsightsPage() {
  const { user } = useUser()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Mock data - in a real app, this would come from an API
  const insights = {
    energy: {
      level: "moderate",
      trend: "improving",
      recommendations: [
        "Consider adding more complex carbohydrates to your diet",
        "Try to maintain consistent meal timing",
        "Include more iron-rich foods to combat fatigue",
      ],
    },
    performance: {
      level: "good",
      trend: "stable",
      recommendations: [
        "Your protein intake is supporting muscle recovery well",
        "Consider adding more omega-3 fatty acids for joint health",
        "Maintain your current hydration levels",
      ],
    },
    health: {
      level: "improving",
      trend: "positive",
      recommendations: [
        "Your fiber intake has improved significantly",
        "Continue monitoring your sodium levels",
        "Consider adding more antioxidant-rich foods",
      ],
    },
    cognitive: {
      level: "good",
      trend: "improving",
      recommendations: [
        "Your omega-3 intake is supporting brain health",
        "Consider adding more B-vitamin rich foods",
        "Maintain your current hydration schedule",
      ],
    },
  }

  const trends = [
    {
      title: "Protein Intake",
      description: "Consistently meeting daily goals",
      trend: "up",
      value: "+12%",
      icon: TrendingUp,
    },
    {
      title: "Fiber Consumption",
      description: "Improved over the last month",
      trend: "up",
      value: "+8%",
      icon: TrendingUp,
    },
    {
      title: "Vitamin D Levels",
      description: "Slightly below recommended levels",
      trend: "down",
      value: "-5%",
      icon: AlertTriangle,
    },
    {
      title: "Hydration",
      description: "Maintaining optimal levels",
      trend: "stable",
      value: "0%",
      icon: CheckCircle2,
    },
  ]

  const recommendations = [
    {
      category: "Diet",
      items: [
        {
          title: "Increase Fiber Intake",
          description: "Add more whole grains, fruits, and vegetables to your diet",
          priority: "high",
        },
        {
          title: "Vitamin D Supplementation",
          description: "Consider adding a vitamin D supplement or increasing sun exposure",
          priority: "medium",
        },
        {
          title: "Omega-3 Rich Foods",
          description: "Include more fatty fish, flaxseeds, and walnuts in your meals",
          priority: "low",
        },
      ],
    },
    {
      category: "Lifestyle",
      items: [
        {
          title: "Meal Timing",
          description: "Try to maintain consistent meal times throughout the day",
          priority: "medium",
        },
        {
          title: "Hydration Schedule",
          description: "Set reminders to drink water throughout the day",
          priority: "high",
        },
        {
          title: "Sleep Quality",
          description: "Consider adjusting your evening meal timing for better sleep",
          priority: "medium",
        },
      ],
    },
  ]

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Nutrition Insights</h1>
            <p className="text-muted-foreground">
              Personalized insights and recommendations based on your nutrition data
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <div className="relative">
                <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  className="pl-8"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Energy Levels</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{insights.energy.level}</div>
                  <p className="text-xs text-muted-foreground capitalize">
                    Trend: {insights.energy.trend}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {insights.energy.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Physical Performance</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{insights.performance.level}</div>
                  <p className="text-xs text-muted-foreground capitalize">
                    Trend: {insights.performance.trend}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {insights.performance.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Health</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{insights.health.level}</div>
                  <p className="text-xs text-muted-foreground capitalize">
                    Trend: {insights.health.trend}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {insights.health.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cognitive Function</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{insights.cognitive.level}</div>
                  <p className="text-xs text-muted-foreground capitalize">
                    Trend: {insights.cognitive.trend}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {insights.cognitive.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {trends.map((trend, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{trend.title}</CardTitle>
                    <trend.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {trend.value}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {trend.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {recommendations.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                    <CardDescription>
                      Personalized recommendations for {category.category.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-2">
                        <div className="flex items-start gap-4">
                          <div className={`h-2 w-2 rounded-full mt-2 ${
                            item.priority === "high" ? "bg-red-500" :
                            item.priority === "medium" ? "bg-yellow-500" :
                            "bg-green-500"
                          }`} />
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 