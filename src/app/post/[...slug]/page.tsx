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
import { Skeleton } from "@/components/ui/skeleton";
import PrevNextPost from "@/components/prevnextpost";

interface PostPageProps {
  params: {
    slug: string[];
    loading?: boolean;
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
    title: `Post ${post.title} | ECTY Blog`,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: `Post ${post.title} | ECTY Blog`,
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
      title: `ECTY Blog: ${post.title}`,
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

  if (params.loading) {
    return (
      <div className="mx-auto mt-8 max-w-[700px]">
        <div className="flex items-center gap-[50px] px-2 sm:px-4 md:px-6 lg:px-0">
          <div className="flex-[1]">
            <div>
              <Skeleton className="mx-auto h-[40px] max-w-[350px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" />
              <Skeleton className="mx-auto mt-2 h-6 max-w-[150px]" />
            </div>
            <Skeleton className="mt-8 aspect-[2/1] rounded-[15px] border object-cover" />
            <Skeleton className="mt-4 h-6 w-3/4" />
            <hr className="my-4" />
            <div className="flex gap-2">
              <Skeleton className="h-[22px] w-[50px]" />
              <Skeleton className="h-[22px] w-[90px]" />
              <Skeleton className="h-[22px] w-[70px]" />
            </div>
          </div>
        </div>
        <div className="mx-6 mb-5 mt-12">
          <Skeleton className="h-12 max-w-[300px]" />
          <Skeleton className="mt-12 h-6 w-auto" />
          <Skeleton className="mt-2 h-6 max-w-[600px]" />
          <Skeleton className="mt-2 h-6 w-auto" />
          <Skeleton className="mt-2 h-6 w-3/4" />
          <Skeleton className="mt-2 h-6 w-auto" />
          <Skeleton className="mt-2 h-6 w-2/3" />
          <Skeleton className="mt-2 h-6 max-w-[600px]" />
          <Skeleton className="mt-2 h-6 w-auto" />
        </div>
      </div>
    );
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
            className="mt-8 aspect-[2/1] rounded-[15px] border object-cover"
            placeholder="blur"
            blurDataURL={post.img}
          />
          {post.description ? (
            <p className="mt-4 text-xl text-muted-foreground">
              {post.description}
            </p>
          ) : null}
          <hr className="my-4" />
          <div className="flex gap-2">
            {post.tags?.map((tag) => <Tag tag={tag} key={tag} />)}
            <ShareButton
              text={`Read the post '${post.title}' by @paranoia8972 on Encryptopia Blog:`}
              url={`${siteConfig.url}/${post.slug}`}
            />
          </div>
        </div>
      </div>
      <div className="prose mx-6 mb-5 mt-12 dark:prose-invert prose-code:relative prose-code:rounded prose-code:bg-muted prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:font-mono prose-code:text-sm prose-code:font-semibold">
        <MDXContent code={post.body} />
        <PrevNextPost currentSlug={post.slug} />
      </div>
      <Comments />
    </div>
  );
}
