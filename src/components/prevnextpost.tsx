import React from "react";
import Link from "next/link";
import { posts } from "#site/content";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PrevNextPostProps {
  currentSlug: string;
}

const PrevNextPost: React.FC<PrevNextPostProps> = ({ currentSlug }) => {
  const publishedPosts = posts.filter((post) => post.published);

  const currentIndex = publishedPosts.findIndex(
    (post) => post.slug === currentSlug,
  );

  const prevPost = publishedPosts[currentIndex - 1];
  const nextPost = publishedPosts[currentIndex + 1];

  return (
    <>
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-8 md:px-0">
        {prevPost && (
          <Link href={`/${prevPost.slug}`} prefetch={false}>
            <Button variant="ghost">
              <ChevronLeft className="h-4 w-4" />
              &nbsp;&nbsp;
              {prevPost.title}
            </Button>
          </Link>
        )}
        <div className="flex-grow"></div>
        {nextPost && (
          <Link href={`/${nextPost.slug}`}>
            <Button variant="ghost">
              {nextPost.title}&nbsp;&nbsp;
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default PrevNextPost;
