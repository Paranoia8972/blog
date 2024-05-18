import { siteConfig } from "#config";
import { Icons } from "./icons";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.feed}>
            <span className="sr-only">RSS</span>
            <Icons.rss className="h-6 w-6" />
          </Link>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
            <span className="sr-only">Twitter</span>
            <Icons.twitter className="h-6 w-6" />
          </Link>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">GitHub</span>
            <Icons.gitHub className="h-6 w-6" />
          </Link>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <Link href={siteConfig.links.personalSite} target="_blank">
            {siteConfig.author}
          </Link>
          &nbsp;
          &middot;
          <Link href="https://encryptopia.dev/impressum" target="_blank" rel="noreferrer">
            Imprint
          </Link>
        </div>
      </div>
    </footer >
  );
}
