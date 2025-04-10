import Block from "@/page/Block";
import { redirect } from "next/navigation";
import React from "react";

const BlockPage = ({ searchParams }: { searchParams: { token?: string } }) => {
  if (!searchParams?.token) {
    redirect("/");
  } else {
    return <Block />;
  }
};

export default BlockPage;
