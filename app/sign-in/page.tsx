import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950">

            <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-3xl font-bold text-white">Welcome back</h1>
                    <p className="text-zinc-400">Sign in to continue to NutrientTracker</p>
                </div>

                <div className="p-4 bg-zinc-800 rounded-xl border border-zinc-700 shadow-lg">
                    <SignIn />
                </div>
            </div>
        </div>
    );
} 