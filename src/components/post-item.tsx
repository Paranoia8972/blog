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
    <div className="m-auto flex flex-col">
      <Link href={"/" + slug}>
        <Image
          src={img}
          alt={title}
          className="cursor-pointer rounded-xl border object-cover aspect-video"
          width={400}
          height={200}
        />
      </Link>
      <div className="px-4">
        <div className="flex flex-wrap justify-between mt-2 items-center">
          <Link href={"/" + slug}>
            <p className="cursor-pointer text-2xl font-bold">
              {title}
            </p>
          </Link>
          <div className="flex flex-wrap gap-2 pl-2 h-[22px]">
            {tags?.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
        </div>
        <p className="mt-1 text-sm">
          <time dateTime={date}>{formatDate(date)}</time>
        </p>
      </div>
    </div>
  );
}
