"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminTransactionsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
           `${process.env.NEXT_PUBLIC_API_URL}/api/payments/admin/all`,
            {
          withCredentials: true,
        });
        setPayments(response.data);
      } catch (error) {
        toast.error("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-muted-foreground text-sm">View all Stripe subscription payments.</p>
      </div>

      <div className="grid gap-4">
        {payments.length === 0 ? (
          <Card className="p-10 text-center text-muted-foreground">No transactions found.</Card>
        ) : (
          payments.map((payment) => (
            <Card key={payment._id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold">{payment.userName} ({payment.userRole})</h3>
                <p className="text-sm text-muted-foreground">{payment.userEmail}</p>
                <p className="text-sm font-semibold mt-1">Plan: {payment.planName}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">${payment.amount} USD</p>
                <p className="text-xs text-muted-foreground">Txn ID: {payment.transactionId}</p>
                <p className="text-xs text-muted-foreground">Paid: {new Date(payment.paidAt).toLocaleDateString()}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}