import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";
import Image from "next/image";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
  img: string;
}

export function PostItem({
  slug,
  title,
  date,
  tags,
  img,
}: PostItemProps) {
  return (
    <div className="my-2 flex flex-col h-[269px] w-[400]">
      <Link href={"/" + slug}>
        <Image
          src={img}
          alt={title}
          className="cursor-pointer rounded-xl border object-cover aspect-video"
          width={400}
          height={200}
        />
      </Link>
      <div className="flex justify-between items-center mt-2">
        <Link href={"/" + slug}>
          <p className="cursor-pointer px-4 text-2xl font-bold">
            {title}
          </p>
        </Link>
        <div className="flex gap-2 px-4">
          {tags?.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>
      </div>
      <p className="mt-[-2px] px-4 text-sm">
        <time dateTime={date}>{formatDate(date)}</time>
      </p>
    </div>
  );
}
