import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DownloadIcon, AlertCircle } from "lucide-react";
import jsPDF from "jspdf";

const pendingBills = [
  {
    id: "PB002",
    month: "June",
    dueDate: "2023-06-25",
    amount: 50,
    amountAfterDueDate: 55,
    type: "Water",
    status: "pending",
  },
  {
    id: "PB001",
    month: "June",
    dueDate: "2023-06-30",
    amount: 100,
    amountAfterDueDate: 110,
    type: "Electricity",
    status: "pending",
  },
  {
    id: "PB003",
    month: "July",
    dueDate: "2023-07-15",
    amount: 75,
    amountAfterDueDate: 82.5,
    type: "Internet",
    status: "pending",
  },
];

const paidBills = [
  {
    id: "PD001",
    month: "May",
    dueDate: "2023-05-31",
    amount: 95,
    amountAfterDueDate: 95,
    type: "Electricity",
    status: "paid",
  },
  {
    id: "PD002",
    month: "May",
    dueDate: "2023-05-25",
    amount: 48,
    amountAfterDueDate: 48,
    type: "Water",
    status: "paid",
  },
  {
    id: "PD003",
    month: "June",
    dueDate: "2023-06-15",
    amount: 75,
    amountAfterDueDate: 75,
    type: "Internet",
    status: "paid",
  },
];

export default function UserBillTabs() {
  const [activeTab, setActiveTab] = useState("pending");

  const handleDownload = (bill) => {
    console.log("Downloading bill:", bill);
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`${bill.month}'s ${bill.type} Bill`, 10, 10);

    doc.setFontSize(12);
    doc.text(`Bill ID: ${bill.id}`, 10, 20);
    doc.text(`Bill Date: ${bill.amount}`, 10, 30);
    doc.text(`Due Date: ${bill.amountAfterDueDate}`, 10, 40);
    doc.text(`Amount: $${bill.month}`, 10, 50);
    doc.text(`Description: ${bill.type}`, 10, 60);

    doc.save(`Bill-${bill.id}`);
  };

  const BillsTable = ({ bills }) => (
    <Table className="bg-background text-foreground dark:bg-black">
      <TableHeader>
        <TableRow>
          <TableHead>Bill ID</TableHead>
          <TableHead>Month</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Amount After Due Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Download PDF</TableHead>
          <TableHead>Pay Now</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bills.map((bill) => (
          <TableRow key={bill.id}>
            <TableCell>{bill.id}</TableCell>
            <TableCell>{bill.month}</TableCell>
            <TableCell>{bill.dueDate}</TableCell>
            <TableCell>{bill.amount.toFixed(2)}</TableCell>
            <TableCell>{bill.amountAfterDueDate.toFixed(2)}</TableCell>
            <TableCell>{bill.type}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  bill.status === "paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
              </span>
            </TableCell>
            <TableCell>
              <Button
                className="center"
                variant="ghost"
                size="icon"
                onClick={() => handleDownload(bill)}
                aria-label={`Download bill ${bill.id}`}
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </TableCell>
            <TableCell>
              <Button>Pay</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container mx-auto p-4">
      {pendingBills.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            You have {pendingBills.length} pending bill
            {pendingBills.length > 1 ? "s" : ""}. Please pay them as soon as
            possible.
          </AlertDescription>
        </Alert>
      )}
      <Tabs defaultValue="pending" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Bills</TabsTrigger>
          <TabsTrigger value="pending">Pending Bills</TabsTrigger>
          <TabsTrigger value="paid">Paid Bills</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <h2 className="text-2xl font-bold my-4 text-primary">
            Pending Bills
          </h2>
          <BillsTable bills={pendingBills} />
        </TabsContent>
        <TabsContent value="paid">
          <h2 className="text-2xl font-bold my-4 text-primary">Paid Bills</h2>
          <BillsTable bills={paidBills} />
        </TabsContent>
        <TabsContent value="all">
          <h2 className="text-2xl font-bold my-4 text-primary">All Bills</h2>
          <BillsTable bills={[...pendingBills, ...paidBills]} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
