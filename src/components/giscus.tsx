"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Comments() {
  const { theme, resolvedTheme } = useTheme(); // Use resolvedTheme for system theme
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      if (!isMounted) return;

      const script = document.createElement("script");
      script.src = "https://giscus.app/client.js";
      script.setAttribute("data-repo", "paranoia8972/blog");
      script.setAttribute("data-repo-id", "R_kgDOLyBSDQ");
      script.setAttribute("data-category", "Comments");
      script.setAttribute("data-category-id", "DIC_kwDOLyBSDc4CfDmi");
      script.setAttribute("data-mapping", "title");
      script.setAttribute("data-strict", "1");
      script.setAttribute("data-reactions-enabled", "1");
      script.setAttribute("data-emit-metadata", "0");
      script.setAttribute("data-input-position", "top");
      script.setAttribute("data-lang", "en");
      script.setAttribute("crossOrigin", "anonymous");

      const effectiveTheme = theme === "system" ? resolvedTheme : theme;
      script.setAttribute(
        "data-theme",
        effectiveTheme === "dark" ? "dark" : "light",
      );

      document.getElementById("giscus")?.remove();
      document.getElementById("giscus-container")?.appendChild(script);
    };

    updateTheme();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => updateTheme();
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, resolvedTheme, isMounted]);

  return (
    <>
      <div
        id="giscus-container"
        className={`giscus px-2 sm:px-4 md:px-6 lg:px-0 ${theme === "dark" ? "dark" : ""}`}
      >
        <noscript className="text-lg text-red-500">
          Please enable JavaScript to view the comments powered by giscus.
        </noscript>
      </div>
    </>
  );
}
