"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
         {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch {
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/role`,
        { role: newRole },
        { withCredentials: true }
      );
      toast.success("User role updated!");
      fetchUsers(); 
    } catch {
      toast.error("Failed to update user role.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-muted-foreground text-sm">View all registered users and update their roles.</p>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user._id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-sm font-medium">Role:</span>
              <select 
                value={user.role} 
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="border rounded p-1 text-sm bg-background"
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}