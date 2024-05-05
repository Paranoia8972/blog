import Link from 'next/link';
import React from 'react';

interface ShareButtonProps {
    text: string;
    url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ text, url }) => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

    return (
        <Link href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 pl-4">
            Share it on X
        </Link>
    );
};

export default ShareButton;