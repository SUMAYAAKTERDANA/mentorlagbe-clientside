"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function PaymentSuccessPage() {
  const { data: session, refetch } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updatePlan = async () => {
      
      if (session?.user) {
        try {
          
          const response = await axios.post("http://localhost:5000/api/payments/success", {
            planName: "Pro Plan",
            amount: 15,
            transactionId: "txn_" + Date.now(),
            stripeSessionId: "sess_" + Date.now(),
          }, { 
            withCredentials: true, 
            headers: { "Content-Type": "application/json" }
          });

          console.log("Payment Response:", response.data);

          
          if (refetch) {
            await refetch();
          }
        } catch (error) {
          console.error("Failed to update plan", error);
        }
      }
      setLoading(false);
    };
    
   
    if (session) {
      updatePlan();
    }
  }, [session, refetch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <CheckCircle2 className="h-24 w-24 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">Payment Successful! 🎉</h1>
        <p className="text-muted-foreground text-lg">
          {loading ? "Updating your account..." : "Your account has been upgraded to Pro. You can now enjoy all premium features."}
        </p>
        <div className="pt-4">
          <Link href="/dashboard">
            <Button size="lg" className="w-full">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}