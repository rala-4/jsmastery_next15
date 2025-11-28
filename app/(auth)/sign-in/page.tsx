"use client";
import AuthForm from "@/components/AuthForm";
import { SignInSchema } from "@/lib/validaios";
import React from "react";

function SignIn() {
  return (
    <AuthForm
      schema={SignInSchema}
      formType="SIGN_IN"
      defaultValues={{ email: "", password: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
}

export default SignIn;
