"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useLoading } from "@/context/LoadingContext"; // Adjust the path as necessary

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setLoading } = useLoading();
  // Get the current authenticated user
  const user = useUser();
  
  // If no user is authenticated, redirect to sign-in
  if (!user) {
    setLoading(true);
    redirect("/sign-in");
  }

  setLoading(false);

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
} 