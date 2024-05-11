import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "#config";
import { Tag } from "@/components/tag";
import Image from "next/image";
import ShareButton from "@/components/share-button";
import { Comments } from "@/components/giscus";
import TableOfContents from "@/components/table-of-contents";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: `Encryptopia Blog: ${post.title}`,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Encryptopia Blog: ${post.title}`,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}



export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);
  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="mx-auto mt-8 max-w-[700px]">
      <div className="flex items-center gap-[50px] px-2 sm:px-4 md:px-6 lg:px-0">
        <div className="flex-[1]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            <span className="mt-2 block text-center font-bold leading-8 tracking-tight sm:text-4xl">
              {post.title}
            </span>
            <span className="block text-center text-base font-semibold uppercase tracking-wide text-blue-500">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </h1>
          <Image
            src={post.img}
            alt={post.title}
            width={700}
            height={350}
            className="mt-8 rounded-[15px] border object-cover aspect-[2/1]"
          />
          {post.description ? (
            <p className="text-xl mt-4 text-muted-foreground">{post.description}</p>
          ) : null}
          <hr className="my-4" />
          <div className="flex gap-2">
            {post.tags?.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
            <ShareButton text={`Read the post '${post.title}' on Encryptopia Blog:`} url={`${siteConfig.url}/${post.slug}`} />
          </div>
        </div>
      </div>
      <TableOfContents mdxContent={post.body} />
      <div
        className="prose dark:prose-invert mb-5 mt-12 mx-6">
        <MDXContent code={post.body} />
      </div>
      <Comments />
    </div>
  );
}