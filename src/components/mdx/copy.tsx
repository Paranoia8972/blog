"use client";
import React, { useRef, useState } from "react";
import { Clipboard, Check } from "lucide-react";

const CodeBlockWithCopy = ({ children }: { children: React.ReactNode }) => {
  const [copySuccess, setCopySuccess] = useState<React.ReactNode>(null);
  const textRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = () => {
    if (textRef.current) {
      navigator.clipboard
        .writeText(textRef.current.innerText)
        .then(() => {
          setCopySuccess(<Check className="size-4" />);
          setTimeout(() => setCopySuccess(null), 2000);
        })
        .catch(() => {
          setCopySuccess("Failed to copy");
        });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <pre ref={textRef}>{children}</pre>
      <button
        onClick={copyToClipboard}
        className="absolute rounded-md bg-gray-800 p-1 transition hover:bg-gray-800/50"
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
        }}
      >
        {copySuccess ? (
          <Check className="size-4" />
        ) : (
          <Clipboard className="size-4" />
        )}
      </button>
    </div>
  );
};

export default CodeBlockWithCopy;
