import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import axios from "axios";

// Mock customer data
const customers = [
  { id: "1", email: "izuhasohail2003@gmail.com" },
  { id: "2", email: "haseebhassan701@gmail.com" },
  // { id: "3", email: "ibad@example.com" },
];

export default function GenerateBillDialog() {
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerEmail: "",
    month: "",
    dueDate: "",
    amount: "",
    penaltyAmount: "",
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { customerEmail, month, dueDate, amount, penaltyAmount, type } =
      formData;
    if (
      !customerEmail ||
      !month ||
      !dueDate ||
      !amount ||
      !penaltyAmount ||
      !type
    ) {
      toast.error("Please fill out all fields.");
      return;
    }
    const billData = {
      email: customerEmail,
      name: formData.customerEmail.split("@")[0], // Assuming the name is part of the email, adjust if needed
      month,
      amount: parseFloat(amount),
      penalty: parseFloat(penaltyAmount),
      type,
      dueDate,
    };
    console.log("Submitted form data:", formData);
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Bill", 10, 10);

    doc.setFontSize(12);
    doc.text(`Customer Name: ${formData.customerEmail}`, 10, 20);
    doc.text(`Bill Date: ${formData.month}`, 10, 30);
    doc.text(`Due Date: ${formData.dueDate}`, 10, 40);
    doc.text(`Amount: $${formData.amount}`, 10, 50);
    doc.text(`Amount: $${formData.penaltyAmount}`, 10, 50);
    doc.text(`Description: ${formData.type}`, 10, 60);

    const fileBlob = doc.output("blob");
    console.log(fileBlob);

    try {
      await axios.post(`http://localhost:3000/bills?token=${token}`, billData); // Adjust the URL if necessary
      toast.success("Bill created and saved successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error creating bill:", error);
      toast.error("Failed to create bill.");
    }

    setOpen(false);
    // Reset form data
    setFormData({
      customerEmail: "",
      month: "",
      dueDate: "",
      amount: "",
      penaltyAmount: "",
      type: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-secondary">Generate Bill</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Generate Bill</DialogTitle>
          <DialogDescription>
            Fill in the details to generate a new bill.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerEmail" className="text-right">
                Customer Email
              </Label>
              <Select
                name="customerEmail"
                value={formData.customerEmail}
                onValueChange={(value) =>
                  handleSelectChange("customerEmail", value)
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select customer email" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.email}>
                      {customer.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="month" className="text-right">
                Month
              </Label>
              <Input
                id="month"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="penaltyAmount" className="text-right">
                Penalty Amount
              </Label>
              <Input
                id="penaltyAmount"
                name="penaltyAmount"
                type="number"
                value={formData.penaltyAmount}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                name="type"
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select bill type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Water">Water</SelectItem>
                  <SelectItem value="Gas">Gas</SelectItem>
                  <SelectItem value="Internet">Internet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Generate Bill</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
