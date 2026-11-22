"use client";

import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardOverview() {
  const { data: session } = useSession();
  
  const role = (session?.user as { role?: string })?.role || "student";

  if (!session) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back, {session.user.name}</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">Here is an overview of your {role} activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {role === "student" && (
          <>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Applied</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">12</div></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Accepted</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-green-600">4</div></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pending</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-yellow-600">8</div></CardContent></Card>
          </>
        )}

        {role === "tutor" && (
          <>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Tuitions</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">3</div></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Applicants</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-blue-600">15</div></CardContent></Card>
          </>
        )}

        {role === "admin" && (
          <>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Users</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">50</div></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-green-600">$150</div></CardContent></Card>
          </>
        )}

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
          
            <div className="text-3xl font-bold text-primary uppercase">
              {(session.user as { plan?: string })?.plan || "Free"}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}