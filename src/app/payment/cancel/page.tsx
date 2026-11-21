"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-red-600">Payment Cancelled</h1>
        <p className="text-muted-foreground">Your payment was not processed.</p>
        <Link href="/pricing"><Button>Back to Pricing</Button></Link>
      </div>
    </div>
  );
}