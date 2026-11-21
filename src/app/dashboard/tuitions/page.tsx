"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminTuitionsPage() {
  const [tuitions, setTuitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTuitions();
  }, []);

  const fetchTuitions = async () => {
    try {
     
      const response = await axios.get
      (`${process.env.NEXT_PUBLIC_API_URL}/api/payments/admin/all`,
         {
        withCredentials: true,
      });
      setTuitions(response.data);
    } catch (error) {
      toast.error("Failed to fetch tuitions.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tuitions/admin/${id}/status`,
        { status },
        { withCredentials: true }
      );
      toast.success(`Tuition ${status} successfully!`);
      fetchTuitions(); 
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Tuitions</h1>
        <p className="text-muted-foreground text-sm">Approve or reject tuition posts submitted by tutors.</p>
      </div>

      <div className="grid gap-4">
        {tuitions.length === 0 ? (
          <Card className="p-10 text-center text-muted-foreground">
            No tuitions found to manage.
          </Card>
        ) : (
          tuitions.map((tuition) => (
            <Card key={tuition._id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold">{tuition.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Tutor: {tuition.tutorName} | Subject: {tuition.subject} | Fee: ৳{tuition.monthlyFee}
                </p>
                <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  tuition.approvalStatus === 'approved' ? 'bg-green-100 text-green-700' :
                  tuition.approvalStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {tuition.approvalStatus.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                {tuition.approvalStatus !== 'approved' && (
                  <Button 
                    size="sm" 
                    className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white" 
                    onClick={() => handleStatusChange(tuition._id, 'approved')}
                  >
                    Approve
                  </Button>
                )}
                {tuition.approvalStatus !== 'rejected' && (
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="flex-1 md:flex-none" 
                    onClick={() => handleStatusChange(tuition._id, 'rejected')}
                  >
                    Reject
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}