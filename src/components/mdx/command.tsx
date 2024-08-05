import React, { useRef, useState } from "react";
import { Clipboard, Check } from "lucide-react";

const Command = ({
  command,
  nested = false,
}: {
  command: string;
  nested?: boolean;
}) => {
  const [copySuccess, setCopySuccess] = useState<React.ReactNode>(null);
  const commandRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (commandRef.current) {
      navigator.clipboard
        .writeText(commandRef.current.innerText.replace(/^\$/, "").trim())
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
    <>
      <div className="relative flex max-h-96 w-auto items-center overflow-y-auto">
        <div ref={commandRef} className="relative w-auto flex-grow">
          <pre className="overflow-wrap: break-word; white-space: pre-wrap; bg-[#1e293b]">
            <span
              className="sticky-ml-[2px] select-none text-gray-500"
              aria-hidden="true"
            >
              $&nbsp;
            </span>
            <span className="font-mono">{command}</span>

            {!nested && (
              <button
                onClick={copyToClipboard}
                className="absolute right-[10px] top-[36px] z-10 rounded-md bg-gray-300 p-1 transition dark:bg-gray-900"
              >
                {copySuccess ? (
                  <Check className="size-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Clipboard className="size-4 text-gray-600" />
                )}
              </button>
            )}
          </pre>
        </div>
      </div>
    </>
  );
};

export { Command };
