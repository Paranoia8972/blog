import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  published: boolean;
}

interface PrevNextPostProps {
  posts: Post[];
  post: Post;
}

const PrevNextPost: React.FC<PrevNextPostProps> = ({ posts, post }) => {
  const currentIndex = posts.findIndex((p) => p.slug === post.slug);
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const prevPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-8 md:px-0">
      {nextPost && nextPost.published ? (
        <Link href={`/${nextPost.slug}`} prefetch={false}>
          <Button variant="ghost">
            <ChevronLeft className="h-4 w-4" />
            &nbsp;&nbsp;
            {nextPost.title}
          </Button>
        </Link>
      ) : (
        <div></div>
      )}
      {prevPost && prevPost.published ? (
        <Link href={`/${prevPost.slug}`} prefetch={false}>
          <Button variant="ghost">
            {prevPost.title}&nbsp;&nbsp;
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PrevNextPost;
