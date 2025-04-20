"use client";
import styled from "@emotion/styled";
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";
import useComment from "@/hooks/comment/useComment";
import { palette } from "@/styles/palette";
import React from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useInView } from "react-intersection-observer";
import { useParams } from "next/navigation";

const CommunityComment = () => {
  const params = useParams();
  const communityNumber = params?.communityNumber as string;
  const [ref, inView] = useInView();
  if (!communityNumber) {
    return null;
  }
  const {
    commentList: { isLoading, data, isFetching, hasNextPage, fetchNextPage },
  } = useComment("community", Number(communityNumber));
  useInfiniteScroll(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, !isFetching, fetchNextPage, hasNextPage]);
  return (
    <Container>
      <Title>댓글 {data?.pages[0]?.page?.totalElements ?? 0}</Title>
      {!isLoading &&
        data &&
        data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.content.map((comment, itemIndex) => (
              <Comment
                userNumber={comment.userNumber}
                key={comment.commentNumber}
                comment={comment}
                relatedType="community"
                relatedNumber={Number(communityNumber)}
              />
            ))}
          </React.Fragment>
        ))}

      <div ref={ref} style={{ height: 130 }} />
      <CommentForm relatedType="community" relatedNumber={Number(communityNumber)} />
    </Container>
  );
};

const Container = styled.div`
  padding: 22px 0;
  background-color: #f5f5f5;
  overflow-y: auto;
`;
const Title = styled.div`
  margin-bottom: 8px;
  font-size: 16px;
  color: ${palette.비강조};
  font-weight: 600;
  line-height: 19.09px;
`;

export default CommunityComment;
