"use client"

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="absolute top-8 flex items-center gap-2">
        <Image 
          src="/logo.svg" 
          alt="NutrientTracker Logo" 
          width={40} 
          height={40}
          className="h-10 w-10" 
        />
        <h1 className="text-xl font-bold text-white">NutrientTracker</h1>
      </div>
      
      <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="text-zinc-400">Sign in to continue to NutrientTracker</p>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-zinc-900 border-zinc-800",
              headerTitle: "text-white",
              headerSubtitle: "text-zinc-400",
              socialButtonsBlockButton: "bg-zinc-800 text-white hover:bg-zinc-700",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              footerActionLink: "text-blue-500 hover:text-blue-400",
              formFieldInput: "bg-zinc-800 border-zinc-700 text-white",
              formFieldLabel: "text-zinc-400",
              identityPreview: "bg-zinc-800 border-zinc-700",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-blue-500 hover:text-blue-400",
            },
            variables: {
              colorPrimary: "#3b82f6",
              colorText: "#ffffff",
              colorTextSecondary: "#a1a1aa",
              colorBackground: "#18181b",
              colorInputBackground: "#27272a",
              colorInputText: "#ffffff",
            },
          }}
        />
      </div>
    </div>
  );
} 