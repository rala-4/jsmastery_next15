"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
const filters = [
  { name: "react", value: "react" },
  { name: "javascript", value: "javascript" },
  //   { name: "newest", value: "newest" },
  //   { name: "unanswered", value: "unanswered" },
  //   { name: "popular", value: "popular" },
  //   { name: "recomended", value: "recomended" },
];

function HomeFilter() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [active, setActive] = useState(filter || "");
  const router = useRouter();
  const handleClickFilter = (value: string) => {
    let newUrl = "";
    if (active === value) {
      setActive("");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: value.toLowerCase(),
      });
    }
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {filters.map((item) => (
        <Button
          className={cn(
            "body-medium rounded-lg px-6 py-3 capitalize shadow-none",
            active === item.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
          key={item.name}
          onClick={() => {
            handleClickFilter(item.value);
          }}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilter;
