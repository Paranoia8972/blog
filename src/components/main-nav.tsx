"use client";

import { siteConfig } from "#config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <Link
        href="/posts"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/posts" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Posts
      </Link>
      <Link
        href="/tags"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/tags" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Tags
      </Link>
    </nav>
  );
}
