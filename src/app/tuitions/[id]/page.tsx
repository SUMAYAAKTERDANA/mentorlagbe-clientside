"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function TuitionDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [tuition, setTuition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  
  const [applyData, setApplyData] = useState({
    studentPhone: "",
    preferredSchedule: "",
    studentNote: ""
  });

  useEffect(() => {
    fetchTuition();
  }, [id]);

  const fetchTuition = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tuitions/${id}`
    );
      setTuition(response.data);
    } catch  {
      toast.error("Failed to load tuition details.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplying(true);
    try {
      await axios.post
      (`${process.env.NEXT_PUBLIC_API_URL}/api/applications`, 
        {
        tuitionId: id,
        tuitionTitle: tuition.title,
        subject: tuition.subject,
        monthlyFee: tuition.monthlyFee,
        tutorEmail: tuition.tutorEmail,
        studentPhone: applyData.studentPhone,
        preferredSchedule: applyData.preferredSchedule,
        studentNote: applyData.studentNote
      }, { withCredentials: true });

      toast.success("Application submitted successfully!");
      router.push("/dashboard/my-applications");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to apply.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!tuition) return <div className="text-center py-20">Tuition not found</div>;

  const isStudent = session?.user?.role === "student";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column - Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="h-64 md:h-96 w-full bg-muted rounded-xl overflow-hidden">
              {tuition.bannerImage ? (
                <img src={tuition.bannerImage} alt={tuition.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
              )}
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{tuition.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">Tutor: {tuition.tutorName}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                <div><span className="text-sm text-muted-foreground">Subject:</span> <p className="font-semibold">{tuition.subject}</p></div>
                <div><span className="text-sm text-muted-foreground">Class Level:</span> <p className="font-semibold">{tuition.classLevel}</p></div>
                <div><span className="text-sm text-muted-foreground">Mode:</span> <p className="font-semibold">{tuition.mode}</p></div>
                <div><span className="text-sm text-muted-foreground">Days/Week:</span> <p className="font-semibold">{tuition.daysPerWeek} days</p></div>
                {tuition.location && (
                  <div className="col-span-2"><span className="text-sm text-muted-foreground">Location:</span> <p className="font-semibold">{tuition.location}</p></div>
                )}
              </div>

              <h3 className="text-xl font-bold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{tuition.description}</p>
            </div>
          </div>

          {/* Right Column - Apply Form / Info */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">৳{tuition.monthlyFee} <span className="text-sm font-normal text-muted-foreground">/ month</span></CardTitle>
              </CardHeader>
              <CardContent>
                {!session ? (
                  <div className="text-center">
                    <p className="mb-4 text-sm text-muted-foreground">You need to be logged in as a student to apply.</p>
                    <Button className="w-full" onClick={() => router.push("/sign-in")}>Sign In to Apply</Button>
                  </div>
                ) : !isStudent ? (
                  <div className="bg-yellow-50 text-yellow-700 p-4 rounded-md text-sm text-center">
                    Only students can apply for tuitions.
                  </div>
                ) : showApplyForm ? (
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input required value={applyData.studentPhone} onChange={e => setApplyData({...applyData, studentPhone: e.target.value})} placeholder="01XXXXXXXXX" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Preferred Schedule</label>
                      <Input required value={applyData.preferredSchedule} onChange={e => setApplyData({...applyData, preferredSchedule: e.target.value})} placeholder="e.g. Evening after 6 PM" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Note to Tutor (Optional)</label>
                      <textarea 
                        className="w-full p-2 border rounded-md text-sm min-h-20" 
                        value={applyData.studentNote} 
                        onChange={e => setApplyData({...applyData, studentNote: e.target.value})} 
                        placeholder="Why do you want to join?"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={applying}>
                      {applying ? "Submitting..." : "Submit Application"}
                    </Button>
                    <Button type="button" variant="ghost" className="w-full" onClick={() => setShowApplyForm(false)}>Cancel</Button>
                  </form>
                ) : (
                  <Button className="w-full text-lg py-6" onClick={() => setShowApplyForm(true)}>
                    Apply Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}