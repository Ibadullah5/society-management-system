"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for chat messages
const mockMessages = [
  {
    id: 1,
    sender: "John",
    content: "Hey, how are you?",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    sender: "You",
    content: "I'm doing great, thanks! How about you?",
    timestamp: "10:02 AM",
  },
  {
    id: 3,
    sender: "John",
    content: "I'm good too. Did you finish the project?",
    timestamp: "10:05 AM",
  },
  {
    id: 4,
    sender: "You",
    content: "Yes, I just submitted it. How about yours?",
    timestamp: "10:07 AM",
  },
  {
    id: 5,
    sender: "John",
    content: "Still working on it. I might need some help.",
    timestamp: "10:10 AM",
  },
];

// Mock data for chat list
const mockChats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Still working on it. I might need some help.",
    avatar: "/avatar-1.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "See you tomorrow!",
    avatar: "/avatar-2.png",
  },
  {
    id: 3,
    name: "Mike Johnson",
    lastMessage: "Thanks for your help!",
    avatar: "/avatar-3.png",
  },
  {
    id: 4,
    name: "Emily Brown",
    lastMessage: "Can we reschedule?",
    avatar: "/avatar-4.png",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex mt-16 bg-gray-100 ">
      {/* Chat box (70% width) */}
      <div className="w-full lg:w-[70%] p-4 bg-white">
        <Card className="h-full flex flex-col">
          <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-full p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] ${
                      message.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    } rounded-lg p-3`}
                  >
                    <p className="font-semibold">{message.sender}</p>
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Chat list (30% width) */}
      <div className="hidden lg:block w-[30%] p-4 bg-gray-200">
        <Card className="h-full">
          <CardContent className="p-0">
            <ScrollArea className="h-full">
              {mockChats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <Avatar>
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>
                      {chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{chat.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
