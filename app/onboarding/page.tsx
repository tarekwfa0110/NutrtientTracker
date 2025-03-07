import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function OnboardingPage() {
  const user = await currentUser();
  
  // If no user is authenticated, redirect to sign-in
  if (!user) {
    redirect("/sign-in");
  }
  
  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image 
              src="/logo.svg" 
              alt="NutrientTracker Logo" 
              width={64} 
              height={64}
              className="h-16 w-16" 
            />
          </div>
          <CardTitle className="text-2xl">Welcome to NutrientTracker!</CardTitle>
          <CardDescription>
            Let's set up your profile to get the most out of tracking your nutrition.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            Hello <span className="font-semibold">{user.firstName || user.emailAddresses[0].emailAddress}</span>!
          </p>
          <p className="text-center text-muted-foreground">
            We're excited to help you track your nutrition and reach your health goals.
            Complete your profile to get personalized recommendations.
          </p>
          <div className="grid grid-cols-2 gap-2 py-4">
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-center">
                <h3 className="font-medium">Track Nutrients</h3>
                <p className="text-xs text-muted-foreground">Monitor all your essential nutrients</p>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="text-4xl mb-2">🥗</div>
              <div className="text-center">
                <h3 className="font-medium">Meal Planning</h3>
                <p className="text-xs text-muted-foreground">Get personalized meal suggestions</p>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="text-4xl mb-2">📈</div>
              <div className="text-center">
                <h3 className="font-medium">Progress Insights</h3>
                <p className="text-xs text-muted-foreground">See how you're doing over time</p>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="text-4xl mb-2">🔬</div>
              <div className="text-center">
                <h3 className="font-medium">Health Analysis</h3>
                <p className="text-xs text-muted-foreground">Get detailed nutrition reports</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild size="lg" className="w-full">
            <Link href="/dashboard">
              Continue to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

