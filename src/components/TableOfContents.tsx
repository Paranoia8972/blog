import React from 'react';

interface TableOfContentsProps {
    headings: { depth: number; value: string }[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
    return (
        <nav>
            <ul>
                {headings.map((heading, index) => (
                    <li key={index}>
                        <a href={`#${heading.value.replace(/\s+/g, '-').toLowerCase()}`}>
                            {heading.value}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TableOfContents;