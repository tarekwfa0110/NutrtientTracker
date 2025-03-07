import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Beef, Droplets, Dumbbell, Flame, CitrusIcon as Lemon, Milk, Sun, Wheat } from "lucide-react"

interface NutrientCardProps {
  name: string
  current: number
  target: number
  unit: string
  icon: "Flame" | "Beef" | "Wheat" | "Droplets" | "Lemon" | "Milk" | "Dumbbell" | "Sun"
}

export function NutrientCard({ name, current, target, unit, icon }: NutrientCardProps) {
  const percentage = Math.min(Math.round((current / target) * 100), 100)

  const getIcon = () => {
    switch (icon) {
      case "Flame":
        return <Flame className="h-5 w-5" />
      case "Beef":
        return <Beef className="h-5 w-5" />
      case "Wheat":
        return <Wheat className="h-5 w-5" />
      case "Droplets":
        return <Droplets className="h-5 w-5" />
      case "Lemon":
        return <Lemon className="h-5 w-5" />
      case "Milk":
        return <Milk className="h-5 w-5" />
      case "Dumbbell":
        return <Dumbbell className="h-5 w-5" />
      case "Sun":
        return <Sun className="h-5 w-5" />
    }
  }

  const getStatusColor = () => {
    if (percentage < 25) return "text-red-500"
    if (percentage < 75) return "text-yellow-500"
    return "text-teal-500"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="font-medium">{name}</div>
        <div className={`rounded-full bg-muted p-1 ${getStatusColor()}`}>{getIcon()}</div>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="h-2" />
        <div className="mt-2 flex justify-between text-sm">
          <span>
            {current}/{target} {unit}
          </span>
          <span className={getStatusColor()}>{percentage}%</span>
        </div>
      </CardContent>
    </Card>
  )
}

