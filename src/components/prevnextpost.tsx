import React from "react";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
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
      {nextPost ? (
        <div className="flex items-center space-x-4">
          <Link
            href={`/${nextPost.slug}`}
            className="rounded-full bg-muted p-2 transition-colors hover:bg-muted-foreground/20"
            prefetch={false}
          >
            <ChevronLeftIcon className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <h3 className="text-lg font-medium">{nextPost.title}</h3>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {prevPost ? (
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <h3 className="text-lg font-medium">{prevPost.title}</h3>
          </div>
          <Link
            href={`/${prevPost.slug}`}
            className="rounded-full bg-muted p-2 transition-colors hover:bg-muted-foreground/20"
            prefetch={false}
          >
            <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PrevNextPost;

function ChevronLeftIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
