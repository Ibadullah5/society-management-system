import { useState } from "react";
import axios from "axios";
import assets from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import "animate.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (localStorage.getItem("token") !== null) {
    window.location.href = "/dashboard";
  }
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Make the login request to your backend
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { token, id: userId, role, name } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);

      dispatch(setUser({ userId, role, name, token }));
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="mt-16 min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Form Section */}
      <div className="animate__animated animate__fadeInDown flex flex-1 items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground">Login</h1>
            <p className="text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full text-foreground">
              Login with Google
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="animate__animated animate__fadeInRight hidden lg:block lg:flex-1 ">
        <img
          src={assets.login_page_image}
          alt="Image"
          className="w-full h-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
