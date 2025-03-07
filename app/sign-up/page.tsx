import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950">
            <div className=" flex items-center gap-2">
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
                    <p className="text-zinc-400">Start tracking your nutrition journey today</p>
                </div>

                <div className="p-4 bg-zinc-800 rounded-xl border border-zinc-700 shadow-lg">
                    <SignUp />
                </div>
            </div>
        </div>
    );
} 