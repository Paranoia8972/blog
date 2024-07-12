"use client";
import React, { useRef, useState } from "react";
import { Clipboard, Check } from "lucide-react";

const CodeBlockWithCopy = ({ children }: { children: React.ReactNode }) => {
  const [copySuccess, setCopySuccess] = useState<React.ReactNode>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
    <div ref={textRef} className="relative flex items-start">
      <div className="over flow-x-auto flex-grow">{children}</div>
      <button
        onClick={copyToClipboard}
        className="absolute right-[10px] top-0 z-10 rounded-md bg-gray-800 p-1 transition"
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
