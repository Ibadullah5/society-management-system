import React, { useState } from "react";
import axios from "axios";
import assets from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "animate.css";

export default function SignUp() {
  if (localStorage.getItem("token") !== null) {
    window.location.href = "/dashboard";
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [verification, setVerification] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(?:\+92|03)\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character."
      );
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate phone number (Pakistani format)
    if (!validatePhone(phone)) {
      toast.error(
        "Phone number must be in the format +923XXXXXXXXX or 03XXXXXXXXX"
      );
      return;
    }

    // Validate address
    if (address.length < 10) {
      toast.error("Address must be at least 10 characters long");
      return;
    }

    try {
      // Make the signup request to your backend
      const response = await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        password,
        address,
        phone,
      });
      setVerification(true);
      toast.success("A verification email has been sent to your email.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      // Handle error (e.g., show error message)
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row mt-10">
      {/* Left Side - Form Section */}
      <div className="animate__animated animate__fadeInDown flex flex-1 items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground mt-2">
              Create your account to get started
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, City, Country"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      {/* {verification && <p></p>} */}
      {/* Right Side - Image Section */}
      <div className="animate__animated animate__fadeInRight hidden lg:block lg:flex-1">
        <img
          src={assets.login_page_image}
          alt="Image"
          className="w-full h-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
