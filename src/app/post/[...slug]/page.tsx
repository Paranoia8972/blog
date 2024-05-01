import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import Script from "next/script";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "#config";
import { Tag } from "@/components/tag";
import Image from "next/image";

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
      title: post.title,
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
      title: post.title,
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
          <div className="flex gap-2 mb-2">
            {post.tags?.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
          {post.description ? (
            <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
          ) : null}
          <hr className="my-4" />
        </div>
      </div>
      <div
        className="prose dark:prose-invert mb-5 mt-16 mx-6">
        <MDXContent code={post.body} />
      </div>

      <div className="giscus px-2 sm:px-4 md:px-6 lg:px-0">
        <Script id="giscus" src="https://giscus.app/client.js"
          data-repo="paranoia8972/blog"
          data-repo-id="R_kgDOLyBSDQ"
          data-category="Comments"
          data-category-id="DIC_kwDOLyBSDc4CfDmi"
          data-mapping="title"
          data-strict="1"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="top"
          data-theme="dark"
          data-lang="en"
          crossOrigin="anonymous"
          async>
        </Script>
        <noscript className="text-red-500 text-lg">Please enable JavaScript to view the comments powered by giscus.</noscript>
      </div>
    </div>
  );
}
