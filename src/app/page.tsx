import { sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 6);
  return (
    <div className="mx-auto py-6 lg:py-10">
      <div className="mx-auto flex-[5]">
        <div className="container grid grid-cols-1 justify-center gap-6 px-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10 xl:px-10 xl:py-10 2xl:px-24 2xl:py-5">
          {latestPosts.map(
            (post) =>
              post.published && (
                <PostItem
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                  img={post.img}
                />
              ),
          )}
        </div>
      </div>
    </div>
  );
}
