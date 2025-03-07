import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
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
          <h1 className="text-3xl font-bold text-white">Create an account</h1>
          <p className="text-zinc-400">Start tracking your nutrition journey today</p>
        </div>
        
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-green-500 hover:bg-green-600 text-sm normal-case",
              card: "bg-zinc-800 border border-zinc-700 shadow-xl",
              headerTitle: "text-zinc-200",
              headerSubtitle: "text-zinc-400",
              socialButtonsBlockButton: 
                "bg-zinc-700 border border-zinc-600 hover:bg-zinc-600",
              socialButtonsBlockButtonText: "text-zinc-200 font-normal",
              dividerLine: "bg-zinc-600",
              dividerText: "text-zinc-400",
              formFieldLabel: "text-zinc-400",
              formFieldInput: 
                "bg-zinc-900 border-zinc-700 text-zinc-200 focus:border-green-500 focus:ring-green-500",
              footerActionLink: "text-green-500 hover:text-green-400",
              identityPreviewText: "text-zinc-200",
              identityPreviewEditButton: 
                "text-zinc-400 hover:text-zinc-300",
            },
            layout: {
              socialButtonsPlacement: "top",
              showOptionalFields: false,
              termsPageUrl: "https://nutrienttracker.com/terms",
              privacyPageUrl: "https://nutrienttracker.com/privacy",
            },
          }}
        />
      </div>
    </div>
  );
} 