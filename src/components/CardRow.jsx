import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calendar } from "lucide-react";
import CountUp from "react-countup";

export default function CardRow() {
  const [bills, setBills] = useState([]);
  const [totalPendingAmount, setTotalPendingAmount] = useState(0);
  const [totalCollectedThisMonth, setTotalCollectedThisMonth] = useState(0);
  const [pastDueCount, setPastDueCount] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/bills?token=${token}`
        );
        const now = new Date(); // Current date
        const currentMonth = now.getMonth(); // Current month index (0 = January, 11 = December)
        const currentYear = now.getFullYear(); // Current year

        let pendingAmount = 0;
        let collectedThisMonth = 0;
        let pastDueBills = 0;

        const formattedBills = response?.data.map((bill) => {
          const isPaid = bill.status === "paid";
          const billDueDate = new Date(bill.dueDate); // Bill's due date as Date object
          const isPastDue = !isPaid && billDueDate < now; // Check if bill is past due

          // Calculate amount including penalty if unpaid
          const amountAfterDueDate = isPaid
            ? bill.amount
            : bill.amount + bill.penalty;

          // Accumulate pending amount (including penalty)
          if (!isPaid) {
            pendingAmount += amountAfterDueDate;
          }

          // Check if the bill was paid in the current month and year
          const billMonth = billDueDate.getMonth();
          const billYear = billDueDate.getFullYear();

          if (
            isPaid &&
            billMonth === currentMonth &&
            billYear === currentYear
          ) {
            collectedThisMonth += bill.amount;
          }

          // Count bills that are past due
          if (isPastDue) {
            pastDueBills += 1;
          }

          return {
            id: bill._id,
            customerId: bill.user,
            customerName: bill.name,
            month: bill.month,
            dueDate: billDueDate.toLocaleDateString(), // Convert due date to a readable string
            amount: bill.amount,
            amountAfterDueDate,
            type: bill.type.charAt(0).toUpperCase() + bill.type.slice(1),
            status: bill.status.charAt(0).toUpperCase() + bill.status.slice(1),
          };
        });

        // Update the bills state
        setBills(formattedBills);

        // Update dynamic stats
        setTotalPendingAmount(pendingAmount); // Total pending amount (including penalties)
        setTotalCollectedThisMonth(collectedThisMonth); // Total collected in the current month
        setPastDueCount(pastDueBills); // Total bills past due date
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-primary cursor-pointer transform transition-transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Month's Total Amount Collected
            </CardTitle>
            <p className="text-muted-foreground">Rs</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {/* ${totalCollectedThisMonth.toLocaleString()} */}
              <CountUp end={totalCollectedThisMonth} duration={2} />
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +20% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card className="border-primary cursor-pointer transform transition-transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Month's Total Pending Amount
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {/* ${totalPendingAmount.toLocaleString()} */}
              Rs <CountUp end={totalPendingAmount} />
            </div>
            {/* <p className="text-xs text-muted-foreground">-5% from last month</p> */}
          </CardContent>
        </Card>
        <Card className="border-primary cursor-pointer transform transition-transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bills Past Due Date
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              <CountUp end={pastDueCount} />
            </div>
            {/* <p className="text-xs text-muted-foreground">+2 from last month</p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
