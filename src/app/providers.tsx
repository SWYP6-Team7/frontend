"use client";
import QueryClientBoundary from "@/context/QueryClientBoundary";
import ErrorCatcher from "@/context/ErrorCatcher";
import { ReactNode } from "react";
import RootStyleRegistry from "./RootStyleRegistry";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientBoundary>
      <ErrorCatcher />

      <RootStyleRegistry> {children}</RootStyleRegistry>
    </QueryClientBoundary>
  );
}
