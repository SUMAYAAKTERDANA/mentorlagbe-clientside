"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tuitions/featured");
        setFeatured(res.data);
      } catch {
        console.error("Failed to fetch featured tuitions");
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-6xl mb-6">
            Find Your Ideal Tutor or <span className="text-primary">Mentorship</span> Batch Today
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            MentorLagbe connects students with verified tutors for personalized academic guidance.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/tuitions">
              <Button size="lg" className="font-semibold shadow-md">Browse Tuitions</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="lg" variant="outline" className="font-semibold">Become a Tutor</Button>
            </Link>
          </div>
        </div>

        {/* Featured Tuitions Section */}
        <div className="mt-32">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Tuitions</h2>
            <Link href="/tuitions" className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          
          {featured.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">No featured tuitions available yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((tuition) => (
                <Card key={tuition._id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-muted overflow-hidden rounded-t-xl">
                    {tuition.bannerImage ? (
                      <img src={tuition.bannerImage} alt={tuition.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-1">{tuition.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">Tutor: {tuition.tutorName}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm"><span className="font-semibold">Subject:</span> {tuition.subject}</p>
                    <p className="text-sm"><span className="font-semibold">Class:</span> {tuition.classLevel}</p>
                    <div className="text-lg font-bold text-primary mt-2">
                      ৳{tuition.monthlyFee} <span className="text-sm font-normal text-muted-foreground">/ month</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/tuitions/${tuition._id}`} className="w-full">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}