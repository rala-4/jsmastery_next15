"use client";
import AuthForm from "@/components/AuthForm";
import { SignUpSchema } from "@/lib/validaios";
import React from "react";

function SignUp() {
  return (
    <AuthForm
      schema={SignUpSchema}
      formType="SIGN_UP"
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
}

export default SignUp;
