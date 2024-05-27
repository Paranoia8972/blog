"use client"
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Comments() {
    const { theme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            const script = document.createElement('script');
            script.src = 'https://giscus.app/client.js';
            script.setAttribute('data-repo', 'paranoia8972/blog');
            script.setAttribute('data-repo-id', 'R_kgDOLyBSDQ');
            script.setAttribute('data-category', 'Comments');
            script.setAttribute('data-category-id', 'DIC_kwDOLyBSDc4CfDmi');
            script.setAttribute('data-mapping', 'title');
            script.setAttribute('data-strict', '1');
            script.setAttribute('data-reactions-enabled', '1');
            script.setAttribute('data-emit-metadata', '0');
            script.setAttribute('data-input-position', 'top');
            script.setAttribute('data-lang', 'en');
            script.setAttribute('crossOrigin', 'anonymous');
            script.async = true;

            if (theme === 'dark') {
                script.setAttribute('data-theme', 'dark');
            } else {
                script.setAttribute('data-theme', 'light');
            }

            document.getElementById('giscus')?.remove();
            document.getElementById('giscus-container')?.appendChild(script);
        }
    }, [theme, isMounted]);

    return (
        <>
            <div id="giscus-container" className={`giscus px-2 sm:px-4 md:px-6 lg:px-0 ${theme === 'dark' ? 'dark' : ''}`}>
                <noscript className="text-red-500 text-lg">Please enable JavaScript to view the comments powered by giscus.</noscript>
            </div>
        </>
    );
}