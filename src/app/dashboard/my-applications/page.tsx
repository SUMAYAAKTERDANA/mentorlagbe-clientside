"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/applications/my-applications", {
        withCredentials: true,
      });
      setApplications(response.data);
    } catch (error) {
      toast.error("Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this application?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`, {
        withCredentials: true,
      });
      toast.success("Application cancelled!");
      fetchApplications(); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel application.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Applications</h1>
        <p className="text-muted-foreground text-sm">Track the status of your tuition applications.</p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <div className="py-10 text-center text-muted-foreground">
            You haven&apos;t applied to any tuitions yet.
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <Card key={app._id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  <span>{app.tuitionTitle}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {app.status.toUpperCase()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-4">
                  <p><span className="font-medium text-muted-foreground">Tutor:</span> {app.tutorEmail}</p>
                  <p><span className="font-medium text-muted-foreground">Subject:</span> {app.subject}</p>
                  <p><span className="font-medium text-muted-foreground">Fee:</span> ৳{app.monthlyFee} / month</p>
                  <p><span className="font-medium text-muted-foreground">Applied On:</span> {new Date(app.appliedAt).toLocaleDateString()}</p>
                </div>
                
                {app.status === 'pending' && (
                  <Button variant="destructive" size="sm" onClick={() => handleCancel(app._id)}>
                    Cancel Application
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}