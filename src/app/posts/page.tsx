import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encryptopia Blog",
  description: "My wierd knowledge, noted down.",
};

const POSTS_PER_PAGE = 6;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <>
      <div className="mx-auto py-6 lg:py-10">
        <div className="mx-auto flex-[5]">
          <div className="container justify-center gap-6 px-4 md:gap-8 lg:gap-10 xl:px-10 xl:py-10 2xl:px-24 2xl:py-5">
            <div>
              <h1 className="inline-block font-black text-4xl lg:text-5xl">
                Posts
              </h1>
              <p className="text-xl text-muted-foreground">
                My weird knowledge, noted down.
              </p>
              <hr />
            </div>
          </div>
          <div className="container grid grid-cols-1 justify-center gap-6 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10 xl:px-10 xl:py-10 2xl:px-24 2xl:py-5">
            {displayPosts?.length > 0 ? (
              displayPosts.map((post) => {
                const { slug, date, title, description, tags, img } = post;
                return (
                  <PostItem
                    key={slug}
                    slug={slug}
                    date={date}
                    title={title}
                    description={description}
                    tags={tags}
                    img={img}
                  />
                );
              })
            ) : (
              <p>Nothing to see here yet.</p>
            )}
          </div>
        </div>
        <div className="container justify-center gap-6 px-4 md:gap-8 lg:gap-10 xl:px-10 xl:py-10 2xl:px-24 2xl:py-5">
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
          <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1 mt-16">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {sortedTags?.map((t) => (
                <Tag tag={t} key={t} count={tags[t]} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
