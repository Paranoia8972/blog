import Link from "next/link";
import React from "react";
import { PiRedditLogoBold } from "react-icons/pi";

import { Linkedin, Twitter } from "lucide-react";

interface ShareButtonProps {
  text: string;
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ text, url }) => {
  const twitterShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    text,
  )}&url=${encodeURIComponent(url)}`;
  const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
    url,
  )}&title=${encodeURIComponent(text)}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url,
  )}&title=${encodeURIComponent(text)}`;

  return (
    <div className="ml-auto flex flex-col space-y-2">
      <p className="text-sm text-gray-400">Share this post</p>
      <div className="flex space-x-4">
        <Link
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <Twitter className="size-5 text-slate-600 hover:text-slate-600/80" />
        </Link>
        <Link
          href={redditShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pl-1"
        >
          <PiRedditLogoBold className="size-5 text-slate-600 hover:text-slate-600/80" />
        </Link>
        <Link
          href={linkedinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pl-1"
        >
          <Linkedin className="size-5 text-slate-600 hover:text-slate-600/80" />
        </Link>
        {/* <Link href={""} target="_blank" rel="noopener noreferrer" className="pl-1">
                    <IoLink className="size-5 text-slate-600 hover:text-slate-600/80" />
                </Link> */}
      </div>
    </div>
  );
};

export default ShareButton;
