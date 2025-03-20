import Block from "@/page/Block";
import { redirect } from "next/navigation";
import React from "react";

const BlockPage = ({ searchParams }: { searchParams: { token: string | undefined } }) => {
  if (!searchParams?.token) {
    redirect("/");
  }
  return <Block />;
};

export default BlockPage;
