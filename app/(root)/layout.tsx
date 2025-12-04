import React from "react";
import Navbar from "@/components/navigation/navbar";
import LeftSidebar from "@/components/navigation/LeftSidebar";
import RightSidebar from "@/components/navigation/RightSidebar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <div className="flex">
        {" "}
        <LeftSidebar />
        <div className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl"> {children}</div>
        </div>
        <RightSidebar />
      </div>
    </main>
  );
}

export default RootLayout;
