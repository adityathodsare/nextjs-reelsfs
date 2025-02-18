"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { POST } from "../api/videos/route";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // to redirect user
  // userRouter from navigator

  const router = useRouter();
  //router.push("/login");

  // submit method
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setError("your password does not match ");
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { Content_type: "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = response.json();

      if (!response.ok) {
        setError("registration failed");
      }

      router.push("/login");
    } catch (error) {}
  };
  return <div>Register</div>;
}

export default Register;
