'use client';

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { useEffect } from "react";

export function AuthAwareCTAButton() {
  const { isLoaded, isSignedIn } = useAuth();
  const { setLoading } = useLoading();
  
  // Use useEffect to update loading state when auth state changes
  useEffect(() => {
    if (!isLoaded) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    
    // Cleanup function to reset loading state
    return () => {
      setLoading(false);
    };
  }, [isLoaded, setLoading]);
  
  const href = isSignedIn ? "/dashboard" : "/sign-up";
  
  if (!isLoaded) {
    return (
      <Button className="group" disabled>
        <LoadingIndicator />
      </Button>
    );
  }

  return (
    <Link href={href}>
      <Button className="group">
        {isSignedIn ? "Go to Dashboard" : "Start Your Journey"}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
  );
} 