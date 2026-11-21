"use client";

import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  
  const TUTOR_LINK = "https://buy.stripe.com/test_4gM9AU3qP9pIaHA6Jv8og02";
  const STUDENT_LINK = "https://buy.stripe.com/test_fZu9AUaTh9pI7voebX8og01"; 
  const handleSubscribe = (link: string) => {
    if (!session) {
      toast.error("Please sign in to subscribe.");
      router.push("/sign-in");
      return;
    }
    window.location.href = link;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upgrade to Pro</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unlock premium features for both Tutors and Students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tutor Plan */}
          <Card className="border-primary shadow-lg relative">
            <CardHeader>
              <CardTitle className="text-2xl">Pro Tutor</CardTitle>
              <CardDescription>Unlimited tuition posts and verified badge.</CardDescription>
              <div className="text-4xl font-bold mt-4">$15<span className="text-lg font-normal text-muted-foreground">/one-time</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm">
                <li>✅ Unlimited Tuition Posts</li>
                <li>✅ Verified Tutor Badge</li>
                <li>✅ Priority Support</li>
              </ul>
              <Button className="w-full" onClick={() => handleSubscribe(TUTOR_LINK)}>
                Upgrade as Tutor
              </Button>
            </CardContent>
          </Card>

          {/* Student Plan */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Pro Student</CardTitle>
              <CardDescription>Priority booking and exclusive features.</CardDescription>
              <div className="text-4xl font-bold mt-4">$10<span className="text-lg font-normal text-muted-foreground">/one-time</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm">
                <li>✅ Priority Booking</li>
                <li>✅ Exclusive Tuition Access</li>
                <li>✅ Verified Student Badge</li>
              </ul>
              <Button variant="outline" className="w-full" onClick={() => handleSubscribe(STUDENT_LINK)}>
                Upgrade as Student
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}