import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ScrollArea } from "./ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const genAI = new GoogleGenerativeAI("AIzaSyAdVIAhDFF_Y40Bmmnia2juA1dxxgQoI9A");

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [conversation]);

  function typeText(text, index) {
    let textIndex = 0;
    let interval = setInterval(() => {
      setConversation((prev) => {
        if (prev[index]) {
          const updated = [...prev];
          updated[index].answer += text.charAt(textIndex);
          return updated;
        } else {
          clearInterval(interval);
          return prev;
        }
      });

      textIndex++;
      if (textIndex >= text.length) {
        clearInterval(interval);
      }
    }, 30);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newQuestion = { question, answer: "" };
    setConversation((prev) => [...prev, newQuestion]);
    setLoading(true);
    setQuestion("");

    // Prepare the conversation context
    const conversationContext = conversation
      .map((entry) => `Q: ${entry.question}\nA: ${entry.answer}`)
      .join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
      const prompt = `keep your answer without headings${conversationContext}\nQ: ${newQuestion.question}\nA:`;
      const response = await model.generateContent(prompt);
      const responseText = response.response.text();

      // Add response to the latest conversation entry
      const newConversationIndex = conversation.length;
      typeText(responseText, newConversationIndex);
    } catch (error) {
      console.error("Error generating content:", error);
      setConversation((prev) => {
        const updated = [...prev];
        updated[conversation.length - 1].answer = "Error generating answer";
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setConversation([]);
    setQuestion("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 text-sm">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="rounded-full bg-primary text-primary-foreground px-4 py-2 hidden sm:block"
        >
          AI Chat Support
        </Button>
      ) : (
        <Card className="w-96 shadow-lg hidden sm:block">
          <CardHeader className="border-b-[1px] p-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-medium">AI Chat Support</h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <ScrollArea className="text-muted-foreground h-48 pr-3">
              {conversation.map((entry, index) => (
                <div key={index} className="flex flex-col w-full mb-6 gap-2">
                  <div className="max-w-64 px-3 py-2 rounded-md ml-auto bg-primary text-primary-foreground">
                    {entry.question}
                  </div>
                  <div className="max-w-64 px-3 py-2 rounded-md mr-auto bg-secondary text-secondary-foreground">
                    {" "}
                    {entry.answer ||
                      (loading && index === conversation.length - 1 ? (
                        <LoadingCircle />
                      ) : (
                        ""
                      ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-2"
            >
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question"
                className="flex-1"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="submit" disabled={loading}>
                      {loading ? "..." : <SendIcon />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary text-secondary">
                    <p>Send</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={handleClearChat} variant="outline">
                      <NewChatIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary text-secondary">
                    <p>Clear Chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5l7 7-7 7" /> {/* Up Arrow */}
      <path d="M5 12h14" /> {/* Horizontal Line */}
    </svg>
  );
}

const NewChatIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" /> {/* Vertical Line */}
      <path d="M5 12h14" /> {/* Horizontal Line */}
    </svg>
  );
};

const LoadingCircle = () => {
  return (
    <div className="w-4 h-4 bg-black dark:bg-white rounded-full animate-spin"></div>
  );
};
