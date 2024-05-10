import Link from 'next/link';
import React from 'react';
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaRedditAlien } from "react-icons/fa";
import { GoShare } from "react-icons/go";

interface ShareButtonProps {
    text: string;
    url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ text, url }) => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;

    return (
        <div className="flex flex-col space-y-2 ml-auto">
            <p className="text-gray-400 text-sm">Share this post</p>
            <div className="flex space-x-4">
                <Link href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-gray-200/75">
                    <FaXTwitter className="size-5" />
                </Link>
                <Link href={redditShareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-gray-200/75 pl-1">
                    <FaRedditAlien className="size-5" />
                </Link>
                <Link href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-gray-200/75 pl-1">
                    <FaLinkedin className="size-5" />
                </Link>
            </div>
        </div>
    );
};

export default ShareButton;