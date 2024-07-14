"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Callout } from "@/components/mdx/callout";
import { cn } from "@/lib/utils";
import { Tab, Tabs } from "@/components/mdx/tabs";
import { CopyCodeBlock, CopyInlineCode } from "@/components/mdx/copy";
import { Disclosure } from "@/components/mdx/disclosure";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  Tab,
  Tabs,
  Disclosure,
  // code: CopyInlineCode,
  pre: CopyCodeBlock,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
