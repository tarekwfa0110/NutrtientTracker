import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { UserProfile } from "@/components/user-profile";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SignOutButton } from "@clerk/nextjs";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.svg" 
              alt="NutrientTracker Logo" 
              width={32} 
              height={32}
              className="h-8 w-8" 
            />
            <span className="hidden font-bold sm:inline-block">
              NutrientTracker
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            <Link 
              href="/dashboard" 
              className="text-sm font-medium transition-colors hover:text-primary px-2 py-1"
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/meals" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-2 py-1"
            >
              Meals
            </Link>
            <Link 
              href="/dashboard/nutrition" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-2 py-1"
            >
              Nutrition
            </Link>
            <Link 
              href="/dashboard/insights" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-2 py-1"
            >
              Insights
            </Link>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4 md:gap-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search foods..."
              className="w-[200px] pl-8 md:w-[250px] lg:w-[300px]"
            />
          </div>
          
          <ModeToggle />
          <UserProfile />
          <SignOutButton />
        </div>
        

      </div>
    </header>
  );
} 