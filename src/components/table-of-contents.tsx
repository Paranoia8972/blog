"use client"
import React, { useEffect, useState } from 'react';

interface TableOfContentsProps {
    mdxContent: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ mdxContent }) => {
    const [toc, setToc] = useState<string[]>([]);

    useEffect(() => {
        const headings = mdxContent.match(/<h1[^>]*>(.*?)<\/h1>|<h2[^>]*>(.*?)<\/h2>|<h3[^>]*>(.*?)<\/h3>|^(#{1,3})\s(.*)/gm);
        if (headings) {
            setToc(headings.map((heading) => {
                if (heading.startsWith('<h1') || heading.startsWith('<h2') || heading.startsWith('<h3')) {
                    return heading.replace(/<[^>]*>/g, '').trim();
                } else {
                    return heading.replace(/#/, '').trim();
                }
            }));
        }
    }, [mdxContent]);

    return (
        <div className="toc-container">
            <h3>Table of Contents</h3>
            <ul>
                {toc.map((title, index) => (
                    <li key={index}>{title}</li>
                ))}
            </ul>
        </div>
    );
};

export default TableOfContents;