"use client";
import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavLinks({ isMobileNav = false }: { isMobileNav?: boolean }) {
  const pathName = usePathname();
  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          item.route === pathName;
        const user_id = 1;
        if (item.route === "/profile") {
          if (user_id) {
            item.route = `${item.route}/${user_id}`;
          } else {
            return null;
          }
        }
        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive
                ? "primary-gradient text-light-900 rounded-lg"
                : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-4"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {" "}
              {item.label}
            </p>
          </Link>
        );
        return isMobileNav ? (
          <SheetClose asChild key={item.label}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.label}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
}

export default NavLinks;
