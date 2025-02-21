"use client";
import React from "react";
import styled from "@emotion/styled";
import { Post } from "@/utils/calendar";

interface PostProps {
  post: Post;
}

const CalendarPost: React.FC<PostProps> = ({ post }) => {
  if (!post?.index || post?.index < 1 || post?.index > 3) return null;

  return (
    <PostContainer index={post.index} multiple={post.multiple}>
      {!post.start || post.username || post.content}
    </PostContainer>
  );
};

const PostContainer = styled.div<{ index: number; multiple: boolean }>`
  position: absolute;
  width: 100%;
  height: 0.875rem;
  background-color: #bfdbfe;
  font-size: 0.625rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${(props) => !props.multiple && `border-radius: 0.5rem;`}

  ${(props) => {
    switch (props.index) {
      case 1:
        return `
          top: 1.5rem;
        `;
      case 2:
        return `
          top: 2.75rem;
        `;
      case 3:
        return `
          top: 4rem;
        `;
    }
  }}

  @media (min-width: 768px) {
    height: 1rem;
    font-size: 0.75rem;

    ${(props) => {
      switch (props.index) {
        case 1:
          return `
            top: 2rem;
          `;
        case 2:
          return `
            top: 3.5rem;
          `;
        case 3:
          return `
            top: 5rem;
          `;
      }
    }}
  }
`;

export default CalendarPost;
