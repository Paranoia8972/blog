import { getAllTags, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import { posts } from "#site/content";
import { Tag } from "@/components/tag";

export const metadata: Metadata = {
  title: "Tags | ECTY Blog",
  description: "Topics I've written about",
};

export default async function TagsPage() {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-black lg:text-5xl">Tags</h1>
          <p className="text-xl text-muted-foreground">All of &apos;em.</p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {sortedTags?.map((tag) => (
          <Tag tag={tag} count={tags[tag]} key={tag} />
        ))}
      </div>
    </div>
  );
}
