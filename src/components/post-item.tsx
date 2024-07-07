import Link from "next/link";
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

export function PostItem({ slug, title, date, tags, img }: PostItemProps) {
  return (
    <div className="m-auto flex flex-col">
      <Link href={"/" + slug}>
        <Image
          src={img}
          alt={title}
          className="aspect-video cursor-pointer rounded-xl border object-cover"
          width={400}
          height={200}
          blurDataURL={img}
          placeholder="blur"
        />
      </Link>
      <div className="px-4">
        <div className="mt-2 flex flex-wrap items-center justify-between">
          <Link href={"/" + slug}>
            <p className="cursor-pointer text-2xl font-bold">{title}</p>
          </Link>
          <div className="flex h-[22px] flex-wrap gap-2">
            {tags?.map((tag) => <Tag tag={tag} key={tag} />)}
          </div>
        </div>
        <p className="mt-1 text-sm">
          <time dateTime={date}>{formatDate(date)}</time>
        </p>
      </div>
    </div>
  );
}
