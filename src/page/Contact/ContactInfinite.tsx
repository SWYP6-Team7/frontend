"use client";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import styled from "@emotion/styled";
import React from "react";
import { useInView } from "react-intersection-observer";

import { useSearchParams } from "next/navigation";
import CustomLink from "@/components/CustomLink";
import ContactItem from "./ContactItem";

const ContactInfinite = () => {
  const [ref, inView] = useInView();
  const searchParams = useSearchParams();

  // const {
  //   communityList: { data, isFetching, hasNextPage, fetchNextPage, isLoading }
  // } = useCommunity(
  //   undefined,
  //   {
  //     sortingTypeName: sort,
  //     categoryName: categoryName
  //   },
  //   isMine
  // )

  // useInfiniteScroll(() => {
  //   if (inView) {
  //     !isFetching && hasNextPage && fetchNextPage()
  //   }
  // }, [inView, !isFetching, fetchNextPage, hasNextPage])

  return (
    <>
      {/* {!isLoading &&
        data &&
        data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.content.map((content, itemIndex) => (
              <CustomLink to={`/contact/${content.postNumber}`}>
                <CommunityItem data={content} />
              </CustomLink>
            ))}
          </React.Fragment>
        ))} */}
      <CustomLink to={`/contact/${1}`}>
        <ContactItem
          data={{
            title: "문의합니다.",
            content: "문의합니다!!",
            inquiryType: "일반문의",
            status: "진행 중",
            date: "2025-01-18 03:32",
          }}
        />
      </CustomLink>
      <CustomLink to={`/contact/${2}`}>
        <ContactItem
          data={{
            title: "로그인이 안돼여",
            content: "로그인이 안돼요!",
            inquiryType: "로그인 문의",
            status: "답변 완료",
            date: "2025-01-09 03:32",
          }}
        />
      </CustomLink>
      <div ref={ref} style={{ height: 130 }} />
    </>
  );
};

export default ContactInfinite;
