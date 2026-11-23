"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
              Mentor<span className="text-blue-600">Lagbe</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tuitions" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Browse Tuitions
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>

          {/* Right Side Auth */}
          <div className="flex items-center space-x-4">
            {isPending ? (
              <span className="text-sm text-muted-foreground">Loading...</span>
            ) : session ? (
              <>
                <div className="flex items-center gap-2">
                  <Avatar className="h-9 w-9 border border-primary/20">
                    {/* এখানে as any মুছে ফেলা হয়েছে */}
                    <AvatarImage src={session.user.image || ""} alt={session.user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-slate-700 font-medium hidden sm:block">
                    {session.user.name}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
                  Dashboard
                </Button>
                <Button variant="destructive" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Button size="sm" onClick={() => router.push("/sign-up")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}