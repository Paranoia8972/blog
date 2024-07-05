import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  LightBulbIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  FireIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

interface CalloutProps {
  children?: ReactNode;
  type?: "info" | "danger" | "caution" | "tip" | "note";
  title?: string;
}

const calloutIcon = {
  info: <ExclamationCircleIcon className="w-6 h-6 mr-2" />,
  danger: <FireIcon className="w-6 h-6 mr-2" />,
  caution: <ExclamationTriangleIcon className="w-6 h-6 mr-2" />,
  tip: <LightBulbIcon className="w-6 h-6 mr-2" />,
  note: <InformationCircleIcon className="w-6 h-6 mr-2" />,
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
        "p-4 mb-6 border border-l-4 border-l-current dark:border-t-0 dark:border-b-0 dark:border-r-0 rounded-md text-sm not-prose",
        {
          "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-600/10 dark:prose":
            type === "danger",
          "text-yellow-700 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-600/10 dark:prose":
            type === "caution",
          "text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-600/10 dark:prose":
            type === "info",
          "text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-600/10 dark:prose":
            type === "tip",
          "text-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-600/10 dark:prose":
            type === "note",
        }
      )}
      {...props}
    >
      <div className="flex flex-col">
        <div className="flex items-center uppercase font-bold">
          {calloutIcon[type]}
          {title ? title : type}
        </div>
      </div>
      {children}
    </div>
  );
}
