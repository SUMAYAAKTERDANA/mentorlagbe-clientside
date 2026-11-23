"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, CheckCircle2, Star } from "lucide-react";

interface Tuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  monthlyFee: number;
  tutorName: string;
  bannerImage?: string;
}

export default function Home() {
  const [featured, setFeatured] = useState<Tuition[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tuitions/featured`);
        setFeatured(res.data);
      } catch (error) {
        console.error("Failed to fetch featured tuitions");
      }
    };
    fetchFeatured();
  }, []);

  // return (
  //   <div className="min-h-screen bg-background font-sans">
  //     <Navbar />
  return (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
   
      <main>
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary/10 via-background to-background py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Star className="h-4 w-4" /> Trusted by thousands of students
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
              Find Your Ideal Tutor or <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                Mentorship Batch
              </span> Today
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              MentorLagbe connects students with verified tutors for personalized academic guidance. Start your learning journey with us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/tuitions">
                <Button size="lg" className="font-semibold shadow-lg shadow-primary/25 w-full sm:w-auto text-lg h-14 px-8">
                  Browse Tuitions
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="lg" variant="outline" className="font-semibold w-full sm:w-auto text-lg h-14 px-8 bg-background">
                  Become a Tutor
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How MentorLagbe Works</h2>
              <p className="text-muted-foreground text-lg">Simple steps to find your perfect learning path.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-card rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transform rotate-3">
                  <Users className="h-10 w-10 text-primary transform -rotate-3" />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Create an Account</h3>
                <p className="text-muted-foreground">Sign up as a Student or Tutor to get started.</p>
              </div>
              <div className="text-center p-8 bg-card rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transform rotate-3">
                  <BookOpen className="h-10 w-10 text-primary transform -rotate-3" />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Find or Post Tuitions</h3>
                <p className="text-muted-foreground">Browse verified batches or post your own as a tutor.</p>
              </div>
              <div className="text-center p-8 bg-card rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transform rotate-3">
                  <Award className="h-10 w-10 text-primary transform -rotate-3" />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Start Learning</h3>
                <p className="text-muted-foreground">Apply, get accepted, and begin your journey.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tuitions Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Tuitions</h2>
                <p className="text-muted-foreground mt-2 text-lg">Explore our top-rated tuition batches.</p>
              </div>
              <Link href="/tuitions">
                <Button variant="outline" className="font-medium">View All Tuitions</Button>
              </Link>
            </div>
            
            {featured.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">Loading tuitions...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featured.slice(0, 6).map((tuition) => (
                  <Card key={tuition._id} className="flex flex-col hover:shadow-xl transition-all duration-300 border-0 shadow-md group bg-card">
                    <div className="relative h-56 w-full bg-muted overflow-hidden rounded-t-xl">
                      {tuition.bannerImage ? (
                        <Image 
                          src={tuition.bannerImage} 
                          alt={tuition.title} 
                          fill 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                      )}
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                        ৳{tuition.monthlyFee}/mo
                      </div>
                    </div>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors">{tuition.title}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Users className="h-4 w-4" /> {tuition.tutorName}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">{tuition.subject}</span>
                        <span className="text-xs bg-secondary text-secondary-foreground font-medium px-3 py-1 rounded-full">{tuition.classLevel}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/tuitions/${tuition._id}`} className="w-full">
                        <Button className="w-full font-semibold">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
                {/* Stats Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="shadow-lg border-t-4 border-t-primary rounded-xl overflow-hidden">
                <CardContent className="p-6 text-center">
                  <h3 className="text-4xl font-extrabold text-foreground mb-2">500+</h3>
                  <p className="text-sm text-muted-foreground font-medium">Verified Tutors</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-t-4 border-t-blue-500 rounded-xl overflow-hidden">
                <CardContent className="p-6 text-center">
                  <h3 className="text-4xl font-extrabold text-foreground mb-2">2000+</h3>
                  <p className="text-sm text-muted-foreground font-medium">Happy Students</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-t-4 border-t-green-500 rounded-xl overflow-hidden">
                <CardContent className="p-6 text-center">
                  <h3 className="text-4xl font-extrabold text-foreground mb-2">150+</h3>
                  <p className="text-sm text-muted-foreground font-medium">Active Tuitions</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-t-4 border-t-yellow-500 rounded-xl overflow-hidden">
                <CardContent className="p-6 text-center">
                  <h3 className="text-4xl font-extrabold text-foreground mb-2">4.8/5</h3>
                  <p className="text-sm text-muted-foreground font-medium">Average Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}