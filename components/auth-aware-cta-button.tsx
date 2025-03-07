'use client';

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext"; // Adjust the path as necessary
import LoadingIndicator from "@/components/ui/LoadingIndicator";

export function AuthAwareCTAButton() {
  const { isLoaded, isSignedIn } = useAuth();
  const { setLoading } = useLoading();
  
  const href = isSignedIn ? "/dashboard" : "/sign-up";
  
  if (!isLoaded) {
    setLoading(true); // Set loading state
    return (
      <Button className="group" disabled>
        <LoadingIndicator />
      </Button>
    );
  }

  setLoading(false); // Reset loading state

  return (
    <Link href={href}>
      <Button className="group">
        {isSignedIn ? "Go to Dashboard" : "Start Your Journey"}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
  );
} 