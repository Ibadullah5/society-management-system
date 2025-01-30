import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Button } from "./ui/button";

const NotificationModel = () => {
  const notification = [
    {
      id: "7",
      message: "You are due an Electircity Bill on 31/09/2024",
      isValid: true,
      billUrl: "billurl",
      date: "03/09/2024",
      createdAt: "01/09/2024",
    },
    {
      id: "8",
      message: "You are due an Electircity Bill on 31/09/2024",
      isValid: false,
      billUrl: "billurl",
      date: "03/09/2024",
      createdAt: "01/09/2024",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <BellIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-3xl">Notifcations</DialogTitle>
        <DialogHeader>
          <DialogDescription>
            <div className="flex flex-col gap-3">
              {notification.map((notification) => (
                <Card className="max-w-sm mx-auto">
                  <CardContent
                    className={`${notification.isValid && "bg-gray-200"} pt-6`}
                  >
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="text-xs text-gray-500">
                      <span>Due: {notification.date}</span>
                    </div>
                  </CardContent>
                  <CardFooter
                    className={`${
                      notification.isValid && "bg-gray-200"
                    } flex justify-between items-center`}
                  >
                    <span className="text-xs text-gray-500">
                      Created: {notification.createdAt}
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const BellIcon = () => {
  return (
    <div className="inline-block">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-muted-foreground"
      >
        <path
          d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.73 21a2 2 0 0 1-3.46 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default NotificationModel;
