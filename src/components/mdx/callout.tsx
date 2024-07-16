import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  CircleAlert,
  TriangleAlert,
  Flame,
  Lightbulb,
  Info,
} from "lucide-react";

interface CalloutProps {
  children?: ReactNode;
  type?: "info" | "danger" | "caution" | "tip" | "note";
  title?: string;
}

const calloutIcon = {
  info: <CircleAlert className="mr-2 size-6" />,
  danger: <Flame className="mr-2 size-6" />,
  caution: <TriangleAlert className="mr-2 size-6" />,
  tip: <Lightbulb className="mr-2 h-6 w-6" />,
  note: <Info className="mr-2 size-6" />,
};

export function Callout({
  children,
  type = "note",
  title,
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        "not-prose mb-6 rounded-md border border-l-4 border-l-current p-4 text-sm dark:border-b-transparent dark:border-r-transparent dark:border-t-transparent",
        {
          "bg-red-50 text-red-700 dark:bg-red-600/10 dark:text-red-400":
            type === "danger",
          "bg-yellow-50 text-yellow-700 dark:bg-yellow-600/10 dark:text-yellow-400":
            type === "caution",
          "bg-blue-50 text-blue-700 dark:bg-blue-600/10 dark:text-blue-400":
            type === "info",
          "bg-green-50 text-green-700 dark:bg-green-600/10 dark:text-green-400":
            type === "tip",
          "bg-gray-50 text-gray-700 dark:bg-gray-600/10 dark:text-gray-400":
            type === "note",
        },
      )}
      {...props}
    >
      <div className="flex flex-col">
        <div className="flex items-center font-bold uppercase">
          {calloutIcon[type]}
          {title ? title : type}
        </div>
      </div>
      {children}
    </div>
  );
}
