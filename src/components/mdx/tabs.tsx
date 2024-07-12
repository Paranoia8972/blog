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
      <div className="rounded-b-md rounded-t border bg-[#242737] text-sm font-medium text-gray-300">
        {children.map((child) => (
          <Badge
            key={child.props.id}
            variant={activeTab === child.props.id ? "outline" : "secondary"}
            className="-mb-32 ml-2 mt-2 rounded-md hover:cursor-pointer"
            onClick={() => setActiveTab(child.props.id)}
          >
            {child.props.title}
          </Badge>
        ))}
        <div>
          {children.map((child) => {
            if (child.props.id === activeTab) {
              return <div key={child.props.id}>{child}</div>;
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export { Tabs, Tab };
