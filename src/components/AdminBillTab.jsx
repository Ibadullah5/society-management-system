import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2Icon, Trash2Icon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const billTypes = ["Electricity", "Water", "Internet", "Gas", "Other"];

// Static Bills Data
const staticBills = [
  {
    id: "B001",
    customerId: "CUST001",
    customerName: "John Doe",
    month: "January",
    dueDate: "2024-01-15",
    amount: 100.0,
    amountAfterDueDate: 110.0,
    type: "Electricity",
    status: "Paid",
  },
  {
    id: "B002",
    customerId: "CUST002",
    customerName: "Jane Smith",
    month: "February",
    dueDate: "2024-02-20",
    amount: 50.0,
    amountAfterDueDate: 55.0,
    type: "Water",
    status: "Pending",
  },
  {
    id: "B003",
    customerId: "CUST003",
    customerName: "Alice Johnson",
    month: "March",
    dueDate: "2024-03-10",
    amount: 80.0,
    amountAfterDueDate: 85.0,
    type: "Internet",
    status: "Paid",
  },
  {
    id: "B004",
    customerId: "CUST004",
    customerName: "Bob Williams",
    month: "April",
    dueDate: "2024-04-05",
    amount: 90.0,
    amountAfterDueDate: 95.0,
    type: "Gas",
    status: "Pending",
  },
];

export default function AdminBillDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Using static data for bills
  const [bills, setBills] = useState(staticBills);
  const [editingBill, setEditingBill] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filterBills = (bills, status) => {
    return status === "All"
      ? bills
      : bills.filter((bill) => bill.status.toLowerCase() === status.toLowerCase());
  };

  const handleEditClick = (bill) => {
    setEditingBill({ ...bill });
    setIsEditDialogOpen(true);
  };

  const handleEditConfirm = () => {
    console.log("Edited bill:", editingBill);
    setIsEditDialogOpen(false);
  };

  const deleteBill = (id) => {
    const updatedBills = bills.filter((bill) => bill.id !== id);
    setBills(updatedBills);
    toast.success("Bill Deleted");
  };

  const BillsTable = ({ bills }) => (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by Bill ID, Customer ID, or Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table className="bg-background text-foreground">
        <TableHeader>
          <TableRow>
            <TableHead>Bill ID</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Amount After Due Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell>{bill.id}</TableCell>
              <TableCell>{bill.customerId}</TableCell>
              <TableCell>{bill.customerName}</TableCell>
              <TableCell>{bill.month}</TableCell>
              <TableCell>{bill.dueDate}</TableCell>
              <TableCell>${bill.amount.toFixed(2)}</TableCell>
              <TableCell>${bill.amountAfterDueDate.toFixed(2)}</TableCell>
              <TableCell>{bill.type}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${bill.status === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {bill.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditClick(bill)}>
                    <Edit2Icon className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Bill?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this bill.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteBill(bill.id)} className="bg-red-600 hover:bg-red-500">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Bills</TabsTrigger>
          <TabsTrigger value="pending">Pending Bills</TabsTrigger>
          <TabsTrigger value="paid">Paid Bills</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <BillsTable bills={filterBills(bills, "All")} />
        </TabsContent>
        <TabsContent value="pending">
          <BillsTable bills={filterBills(bills, "Pending")} />
        </TabsContent>
        <TabsContent value="paid">
          <BillsTable bills={filterBills(bills, "Paid")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
