import { siteConfig } from "#config";
import Link from "next/link";
import { Twitter, Github, Rss } from "lucide-react";

export function SiteFooter() {
  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.feed}>
            <span className="sr-only">RSS</span>
            <Rss className="size-6" />
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.twitter}
          >
            <span className="sr-only">Twitter</span>
            <Twitter className="size-6" />
          </Link>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">GitHub</span>
            <Github className="size-6" />
          </Link>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <Link href={siteConfig.links.personalSite} target="_blank">
            {siteConfig.author}
          </Link>
          &nbsp; &middot;
          <Link
            href="https://encryptopia.dev/impressum"
            target="_blank"
            rel="noreferrer"
          >
            Imprint
          </Link>
        </div>
      </div>
    </footer>
  );
}
