"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Users, 
  UserCircle, 
  DollarSign 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();

  
 const role = (session?.user as { role?: string })?.role || "student";

  
  const getSidebarLinks = () => {
    const commonLinks = [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
    ];

    if (role === "student") {
      return [
        ...commonLinks,
        { name: "My Applications", href: "/dashboard/my-applications", icon: FileText },
      ];
    }

    if (role === "tutor") {
      return [
        ...commonLinks,
        { name: "Post Tuition", href: "/dashboard/post-tuition", icon: PlusCircle },
        { name: "My Tuitions", href: "/dashboard/my-tuitions", icon: FileText },
        { name: "Applicants", href: "/dashboard/applicants", icon: Users },
      ];
    }

    if (role === "admin") {
      return [
        ...commonLinks,
        { name: "Manage Users", href: "/dashboard/users", icon: Users },
        { name: "Approve Tuitions", href: "/dashboard/tuitions", icon: FileText },
        { name: "Transactions", href: "/dashboard/transactions", icon: DollarSign },
      ];
    }

    return commonLinks;
  };

  const sidebarLinks = getSidebarLinks();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex gap-6 lg:gap-8">
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center mb-4 w-full justify-between border-b pb-4">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Sidebar (Desktop) */}
        <aside className="w-64 hidden md:block shrink-0">
          <div className="bg-card border rounded-xl shadow-sm p-4 sticky top-24">
            <div className="px-4 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {session?.user?.name?.charAt(0) || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{session?.user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground uppercase">{role}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Sidebar (Mobile Drawer) */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
            
            <div className="relative w-64 bg-background h-full p-4 shadow-xl flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-xl">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}