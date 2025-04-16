'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, TextField, Button, Alert } from "@mui/material";
import { storeTokens } from "../lib/auth";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      storeTokens(data.access, data.refresh);
      router.push("/");
    } catch (err: any) {
      setErrorMessage("Login failed: " + err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }} className="bg-white border-1 border-slate-100 shadow-slate-200 shadow-2xl">
      <Typography variant="h4" align="center" gutterBottom>Login your account</Typography>
      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Typography  className="ml-auto text-slate-700" >
        Don't have an account?
        <Link className="text-blue-600" href="/signup"> Sign Up</Link>
      
        </Typography>
        <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
}