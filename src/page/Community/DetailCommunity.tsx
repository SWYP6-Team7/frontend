"use client";
import CommunityComment from "@/components/community/CommunityComment";
import CommunityPost from "@/components/community/CommunityPost";
import styled from "@emotion/styled";

const DetailCommunity = () => {
  return (
    <Container>
      <CommunityPost />
      <CommunityComment />
    </Container>
  );
};

const Container = styled.div`
  padding: 0 24px;
  background-color: #f5f5f5;
`;

export default DetailCommunity;
