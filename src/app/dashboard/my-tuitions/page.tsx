"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function MyTuitionsPage() {
  const [tuitions, setTuitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyTuitions();
  }, []);

  const fetchMyTuitions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tuitions/my-tuitions", {
        withCredentials: true,
      });
      setTuitions(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch tuitions.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tuition?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tuitions/${id}`, {
        withCredentials: true,
      });
      toast.success("Tuition deleted successfully!");
      fetchMyTuitions(); 
    } catch  {
      toast.error("Failed to delete tuition.");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/tuitions/${id}/toggle`, {}, {
        withCredentials: true,
      });
      toast.success("Status updated!");
      fetchMyTuitions();
    } catch  {
      toast.error("Failed to update status.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Tuitions</h1>
          <p className="text-muted-foreground text-sm">Manage all your posted tuitions here.</p>
        </div>
        <Link href="/dashboard/post-tuition">
          <Button>Post New Tuition</Button>
        </Link>
      </div>

      {tuitions.length === 0 ? (
        <Card>
          <div className="py-10 text-center text-muted-foreground">
            You haven&apos;t posted any tuitions yet.
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {tuitions.map((tuition) => (
            <Card key={tuition._id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                {/* Banner Image */}
                <div className="w-full md:w-64 h-48 md:h-auto bg-muted shrink-0 relative">
                  {tuition.bannerImage ? (
                    <img 
                      src={tuition.bannerImage} 
                      alt={tuition.title} 
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      No Image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                      <h3 className="text-xl font-bold text-foreground">{tuition.title}</h3>
                      <div className="flex space-x-2">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          tuition.approvalStatus === 'approved' ? 'bg-green-100 text-green-700' :
                          tuition.approvalStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {tuition.approvalStatus.toUpperCase()}
                        </span>
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          tuition.isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {tuition.isActive ? 'ACTIVE' : 'CLOSED'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-medium text-foreground">Subject:</span> {tuition.subject} | 
                      <span className="font-medium text-foreground ml-1">Class:</span> {tuition.classLevel} | 
                      <span className="font-medium text-foreground ml-1">Mode:</span> {tuition.mode}
                    </p>
                    <p className="text-lg font-semibold mt-2 text-primary">
                      ৳{tuition.monthlyFee} <span className="text-sm font-normal text-muted-foreground">/ month</span>
                    </p>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" size="sm" onClick={() => handleToggleStatus(tuition._id)}>
                      {tuition.isActive ? "Close Tuition" : "Activate Tuition"}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(tuition._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}