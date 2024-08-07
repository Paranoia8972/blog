"use client";
import React, { useRef, useState, useEffect } from "react";
import { Clipboard, Check } from "lucide-react";

const CopyButton = ({
  children,
  nested = false,
}: {
  children: React.ReactNode;
  nested?: boolean;
}) => {
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
      <div className="flex-grow">{children}</div>
      {!nested && (
        <button
          onClick={copyToClipboard}
          className="sticky right-[10px] top-0 rounded-md bg-gray-300 p-1 transition dark:bg-gray-900"
        >
          {copySuccess ? (
            <Check className="size-4 text-green-600 dark:text-green-400" />
          ) : (
            <Clipboard className="size-4 text-gray-600" />
          )}
        </button>
      )}
    </div>
  );
};

const CopyCodeBlock: React.FC<
  React.HTMLProps<HTMLPreElement> & {
    "data-language"?: string;
  }
> = (props) => {
  const { "data-language": language, children, ...rest } = props;

  const isCodeTag =
    React.Children.count(children) === 1 &&
    React.isValidElement(React.Children.toArray(children)[0]) &&
    (React.Children.toArray(children)[0] as React.ReactElement).type === "code";

  return (
    <>
      <pre {...rest}>
        {isCodeTag ? (
          <>
            {React.Children.map(children, (child) =>
              React.isValidElement(child) ? (
                <CopyButton {...child.props} />
              ) : (
                child
              ),
            )}
          </>
        ) : (
          children
        )}
      </pre>
    </>
  );
};

const CopyInlineCode = ({ children }: { children: React.ReactNode }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => setIsCopied(true),
      (err) => console.error("Failed to copy:", err),
    );
  };

  return (
    <code
      className="cursor-pointer"
      onClick={() => copyToClipboard(children?.toString() ?? "")}
    >
      {children}
    </code>
  );
};

export { CopyButton, CopyCodeBlock, CopyInlineCode };
