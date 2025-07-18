"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email, // user email address
      password, // user password -> min 8 characters by default
      name, 
    },
    {
      onError: () => {
        window.alert("signup failed");
      },
      onSuccess: () => {
        window.alert("success")
      }
      
    })
  }

  return(
    <div>
      <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="password" type="password" value={password} onChange = {(e) => setPassword(e.target.value)} />

      <Button onClick={onSubmit}>
        create user
      </Button>
      
    </div>
  )
}
