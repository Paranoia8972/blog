"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface TabProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

const Tab: React.FC<TabProps> = ({ id, title, children }) => {
  return <div id={id}>{children}</div>;
};

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.id);

  return (
    <>
      <div className="mt-[2em] rounded-t-md bg-gray-100 text-sm font-medium text-gray-300 dark:bg-[#0b192d]">
        {children.map((child) => (
          <Badge
            key={child.props.id}
            variant={activeTab === child.props.id ? "default" : "outline"}
            className={`my-2 ml-2 rounded border-0 hover:cursor-pointer ${
              activeTab === child.props.id
                ? "bg-gray-300 text-black hover:bg-gray-300 dark:bg-slate-500 dark:text-slate-950"
                : "bg-transparent text-gray-600 transition hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-500"
            }`}
            onClick={() => setActiveTab(child.props.id)}
          >
            {child.props.title}
          </Badge>
        ))}
      </div>
      <div className="my-0 rounded-b-md border border-[#0b192d] bg-[#1e293b]">
        {children.map((child) => {
          if (child.props.id === activeTab) {
            return (
              <div key={child.props.id} className="-mb-[32px] -mt-[32px]">
                {child}
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export { Tabs, Tab };
