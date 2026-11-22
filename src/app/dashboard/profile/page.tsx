"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = useSession();
  const [formData, setFormData] = useState({ name: "", phone: "", bio: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (session?.user) {
      const user = session.user as { name?: string; phone?: string; bio?: string };
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
   
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("bio", formData.bio);
      
      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      
      if (refetch) {
        await refetch();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update profile.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Update Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your personal information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input value={session?.user?.email || ""} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input 
                value={formData.phone} 
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                placeholder="01XXXXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <textarea 
                className="w-full p-2 border rounded-md min-h-25 text-sm" 
                value={formData.bio} 
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Profile Picture (Optional)</label>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}