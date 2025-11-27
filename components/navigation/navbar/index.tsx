import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Theme } from "./Theme";

function Navbar() {
  return (
    <nav className="flex-between background-light900_dark200 w-full z-50 fixed p-6 shadow-light-300 dark:shadow-none sm:px-12 g-5">
      <Link href="/" className="flex gap-1 items-center">
        <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="Dev Flow"
        />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Flow</span>
        </p>
      </Link>
      <p>Global Search</p>
      <div className="flex-between gap-5">
        <Theme />
      </div>
    </nav>
  );
}

export default Navbar;
