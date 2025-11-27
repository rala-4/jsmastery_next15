"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";

function SocialAuthForm() {
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      // throw new Error("bad request");
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
      });
    } catch (error) {
      toast("Error", {
        description: error instanceof Error ? error.message : "sothing wrong",
        style: {
          "--normal-bg":
            "light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))",
          "--normal-text": "var(--color-white)",
          "--normal-border": "transparent",
        } as React.CSSProperties,
      });
    }
  };
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5 cursor-pointer";
  return (
    <div className="flex flex-wrap gap-2.5 mt-10">
      <Button
        className={buttonClass}
        onClick={() => {
          handleSignIn("github");
        }}
      >
        <Image
          src="/icons/github.svg"
          alt="GitHub icon"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Login with GitHub</span>
      </Button>
      <Button
        className={buttonClass}
        onClick={() => {
          handleSignIn("google");
        }}
      >
        <Image
          src="/icons/google.svg"
          alt="Google icon"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Login with Gmail</span>
      </Button>
    </div>
  );
}

export default SocialAuthForm;
