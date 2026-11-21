"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BrowseTuitionsPage() {
  const [tuitions, setTuitions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTuitions();
  }, []);

  const fetchTuitions = async () => {
    try {
      
      const response = await axios.get(
       `${process.env.NEXT_PUBLIC_API_URL}/api/tuitions`
    );
      setTuitions(response.data);
    } catch (error) {
      console.error("Failed to fetch tuitions", error);
    } finally {
      setLoading(false);
    }
  };

  
  const filteredTuitions = tuitions.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Tuitions</h1>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Find the perfect batch or 1-on-1 mentorship for your learning journey.
          </p>
          
          <div className="max-w-xl mx-auto flex gap-2">
            <Input 
              placeholder="Search by title or subject..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-zinc-900"
            />
            <Button>Search</Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading tuitions...</div>
        ) : filteredTuitions.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No tuitions found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTuitions.map((tuition) => (
              <Card key={tuition._id} className="flex flex-col hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 w-full bg-muted relative">
                  {tuition.bannerImage ? (
                    <img 
                      src={tuition.bannerImage} 
                      alt={tuition.title} 
                      className="w-full h-full object-cover absolute inset-0" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-1">{tuition.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">Tutor: {tuition.tutorName}</p>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="space-y-1 text-sm mb-4">
                    <p><span className="font-semibold">Subject:</span> {tuition.subject}</p>
                    <p><span className="font-semibold">Class:</span> {tuition.classLevel}</p>
                    <p><span className="font-semibold">Mode:</span> {tuition.mode}</p>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    ৳{tuition.monthlyFee} <span className="text-sm font-normal text-muted-foreground">/ month</span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Link href={`/tuitions/${tuition._id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}