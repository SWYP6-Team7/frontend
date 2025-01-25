"use client";
import useViewTransition from "@/hooks/useViewTransition";
import Link from "next/link";
import React from "react";

type CustomLinkProps = {
  to: string;
  children: React.ReactNode;
};

const CustomLink = ({ to, children, ...props }: CustomLinkProps) => {
  const navigateWithTransition = useViewTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.documentElement.style.viewTransitionName = "forward";
    navigateWithTransition(to);
  };

  return (
    <Link href={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
