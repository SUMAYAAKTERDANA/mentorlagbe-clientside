"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


interface Application {
  _id: string;
  studentName: string;
  tuitionTitle: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote?: string;
  status: string;
}

export default function ApplicantsPage() {
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applications/tutor-applications`,
          { withCredentials: true }
        );
        setApplications(response.data);
      } catch {
        toast.error("Failed to fetch applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applications/${id}/status`,
        { status },
        { withCredentials: true }
      );
      toast.success(`Application ${status} successfully!`);
     
      window.location.reload();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Applicants</h1>
        <p className="text-muted-foreground text-sm">Review students who applied for your tuitions.</p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            No applicants yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <Card key={app._id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold">{app.studentName}</h3>
                <p className="text-sm text-muted-foreground">Tuition: {app.tuitionTitle}</p>
                <p className="text-sm"><span className="font-medium">Email:</span> {app.studentEmail}</p>
                <p className="text-sm"><span className="font-medium">Phone:</span> {app.studentPhone}</p>
                <p className="text-sm"><span className="font-medium">Schedule:</span> {app.preferredSchedule}</p>
                {app.studentNote && (
                  <p className="text-sm mt-1 italic text-muted-foreground">&quot;{app.studentNote}&quot;</p>
                )}
                
                <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {app.status.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                {app.status !== 'accepted' && (
                  <Button 
                    size="sm" 
                    className="flex-1 md:flex-none bg-green-600 hover:bg-green-700" 
                    onClick={() => handleStatusChange(app._id, 'accepted')}
                  >
                    Accept
                  </Button>
                )}
                {app.status !== 'rejected' && (
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="flex-1 md:flex-none" 
                    onClick={() => handleStatusChange(app._id, 'rejected')}
                  >
                    Reject
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}