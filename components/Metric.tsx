import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  imgUrl?: string;
  textStyles?: string;
  imageStyles?: string;
  value: string | number;
  alt?: string;
  title: string;
  href?: string;
  isAuthor?: boolean;
}
function Metric({
  imgUrl,
  alt,
  title,
  value,
  textStyles,
  href,
  isAuthor,
}: Props) {
  const metricContent = (
    <>
      {imgUrl && alt && <Image src={imgUrl} width={16} height={16} alt={alt} />}
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        {title && (
          <span className={cn("small-regular line-clamp-1")}>{title}</span>
        )}
      </p>
    </>
  );
  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
}

export default Metric;
