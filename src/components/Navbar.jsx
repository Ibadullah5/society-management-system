import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Toggle } from "@/components/ui/toggle";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import assets from "../assets";
import NotificationModel from "./NotificationModel";

export default function NavBar({ toggleTheme }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const logoutUser = () => {
    console.log("hello");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
      <NavLink to="#" className="flex items-center">
        <MountainIcon className="h-6 w-6 text-muted-foreground" />
        <p className="ml-2 text-xl font-bold">Society Sphere</p>
        <span className="sr-only">Acme Inc</span>
      </NavLink>
      <nav className="hidden items-center gap-4 md:flex">
        <img
          onClick={() => {
            if (theme === "dark") {
              localStorage.setItem("theme", "light");
              toggleTheme("light");
              setTheme("light");
            } else {
              localStorage.setItem("theme", "dark");
              toggleTheme("dark");
              setTheme("dark");
            }
          }}
          className="w-4 cursor-pointer "
          src={
            localStorage.getItem("theme") === "dark"
              ? assets.light_mode
              : assets.night_mode
          }
          alt="light-mode"
        />
        <NotificationModel />
        <Button onClick={logoutUser}>Logout</Button>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6 text-muted-foreground" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="md:hidden">
          <div className="flex flex-col items-start gap-4 px-4 py-6">
            <img
              onClick={() => {
                if (theme === "dark") {
                  localStorage.setItem("theme", "light");
                  toggleTheme("light");
                  setTheme("light");
                } else {
                  localStorage.setItem("theme", "dark");
                  toggleTheme("dark");
                  setTheme("dark");
                }
              }}
              className="w-4 cursor-pointer "
              src={
                localStorage.getItem("theme") === "dark"
                  ? assets.light_mode
                  : assets.night_mode
              }
              alt="light-mode"
            />
            <Button OnClick={logoutUser}>Logout</Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MoonIcon(props) {
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
