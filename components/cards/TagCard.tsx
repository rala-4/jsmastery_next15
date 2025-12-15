import ROUTES from "@/constants/routes";
import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { getDeviconClassName } from "@/lib/utils";
import Image from "next/image";
interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  isButton?: boolean;
  remove?: boolean;
  handleRemove?: () => void;
}
function TagCard({
  _id,
  name,
  questions,
  showCount,
  compact,
  isButton,
  remove,
  handleRemove,
}: Props) {
  const content = (
    <>
      {" "}
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={getDeviconClassName(name)}></i>
          <span>{name}</span>
        </div>
      </Badge>
      {remove && (
        <Image
          alt="remove"
          src="/icons/close.svg"
          width={12}
          height={12}
          className=" object-contain cursor-pointer invert-0 dark:invert"
          onClick={handleRemove}
        />
      )}
      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  );
  if (compact) {
    return isButton ? (
      <button className="flex flex-row gap-2 justify-between" key={_id}>
        {content}
      </button>
    ) : (
      <Link
        href={ROUTES.TAG(_id)}
        className="flex justify-between gap-2"
        key={_id}
      >
        {content}
      </Link>
    );
  }
}

export default TagCard;
