import React from "react";
import { posts } from "#site/content";

interface PostNavigationProps {
  currentIndex: number;
}

const PostNavigation: React.FC<PostNavigationProps> = ({ currentIndex }) => {
  const prevPostIndex = currentIndex > 0 ? currentIndex - 1 : null;
  const nextPostIndex =
    currentIndex < posts.length - 1 ? currentIndex + 1 : null;

  const getPostUrl = (index: number) => `/${posts[index].slugAsParams}`;

  return (
    <div className="flex justify-between mt-8">
      {prevPostIndex !== null && (
        <a
          href={getPostUrl(prevPostIndex)}
          className="text-blue-500 hover:underline"
        >
          Previous Post
        </a>
      )}
      {nextPostIndex !== null && (
        <a
          href={getPostUrl(nextPostIndex)}
          className="text-blue-500 hover:underline"
        >
          Next Post
        </a>
      )}
    </div>
  );
};

export default PostNavigation;
