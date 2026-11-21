"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";

export default function PostTuitionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: "", 
    subject: "", 
    classLevel: "Class 9", 
    mode: "Online", 
    location: "", 
    monthlyFee: "", 
    daysPerWeek: "", 
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key as keyof typeof formData]);
      });
      if (imageFile) {
        data.append("banner", imageFile);
      }

      
      await axios.post("http://localhost:5000/api/tuitions", data, {
        withCredentials: true, 
        headers: { 
          "Content-Type": "multipart/form-data",
        }
      });

      toast.success("Tuition Posted Successfully! Waiting for Admin Approval.");
      router.push("/dashboard/my-tuitions");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to post tuition. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Post a New Tuition</h1>
        <p className="text-muted-foreground text-sm">Create a new batch or 1-on-1 mentorship.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tuition Details</CardTitle>
          <CardDescription>Provide accurate information for students.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input name="title" required onChange={handleChange} placeholder="e.g. Math for Class 9" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input name="subject" required onChange={handleChange} placeholder="e.g. Mathematics" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Class Level</label>
                <Input name="classLevel" required onChange={handleChange} placeholder="e.g. Class 9-10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mode</label>
                <select name="mode" onChange={handleChange} className="w-full p-2 border rounded-md">
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Monthly Fee (BDT)</label>
                <Input name="monthlyFee" type="number" required onChange={handleChange} placeholder="e.g. 5000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Days per Week</label>
                <Input name="daysPerWeek" type="number" required onChange={handleChange} placeholder="e.g. 3" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location (if offline)</label>
              <Input name="location" onChange={handleChange} placeholder="e.g. Dhanmondi, Dhaka" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea name="description" required onChange={handleChange} className="w-full p-2 border rounded-md min-h-[100px]" placeholder="Describe your teaching style..."></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Banner Image</label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto mt-4">
              {loading ? "Posting..." : "Post Tuition"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}