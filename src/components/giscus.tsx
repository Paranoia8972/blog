"use client"
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

export function Comments() {
    const router = useRouter()
    const { theme, setTheme } = useTheme()

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme)
        router.replace(router.asPath)
    }

    return (
        <>
            <div className="giscus px-2 sm:px-4 md:px-6 lg:px-0">
                <Script id="giscus" src="https://giscus.app/client.js"
                    data-repo="paranoia8972/blog"
                    data-repo-id="R_kgDOLyBSDQ"
                    data-category="Comments"
                    data-category-id="DIC_kwDOLyBSDc4CfDmi"
                    data-mapping="title"
                    data-strict="1"
                    data-reactions-enabled="1"
                    data-emit-metadata="0"
                    data-input-position="top"
                    data-theme={theme === 'dark' ? 'dark' : 'light'}
                    data-lang="en"
                    crossOrigin="anonymous"
                    async>
                </Script>
                <noscript className="text-red-500 text-lg">Please enable JavaScript to view the comments powered by giscus.</noscript>
            </div>
        </>
    );
}