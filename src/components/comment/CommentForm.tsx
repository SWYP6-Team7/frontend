"use client";
import useKeyboardResizeEffect from "@/hooks/useKeyboardResizeEffect";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import UpArrowIcon from "../icons/UpArrowIcon";
import { commentStore } from "@/store/client/commentStore";
import useComment from "@/hooks/comment/useComment";
import ResultToast from "../designSystem/toastMessage/resultToast";
import { isGuestUser } from "@/utils/user";
import { usePathname, useRouter } from "next/navigation";
import CommentInput from "../designSystem/input/CommentInput";
import { useBackPathStore } from "@/store/client/backPathStore";

interface CommentFormProps {
  paddingBottom?: number;
  paddingTop?: number;
  relatedType: "travel" | "community";
  relatedNumber: number;
}

const CommentForm = ({ paddingBottom = 40, paddingTop = 16, relatedType, relatedNumber }: CommentFormProps) => {
  const { isEdit, edit, parentNumber, commentNumber, setReset, isReply } = commentStore();
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  const [isToastShow, setIsToastShow] = useState(false);
  const [value, setValue] = useState("");
  const { post, postMutation, updateMutation, update } = useComment(relatedType, relatedNumber);
  const pathname = usePathname();
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (inputRef.current) {
      inputRef.current.style.height = "32px";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 84)}px`; // 내용에 맞게 높이 조정, 최대 100px
    }
    setValue(e.target.value);
  };
  useKeyboardResizeEffect();
  console.log(value, "value");
  useEffect(() => {
    if (inputRef?.current) {
      if (isEdit && edit !== "") {
        console.log("eidt", edit);
        setValue(edit);
        inputRef.current.focus();
      }
      if (isReply) {
        inputRef.current.focus();
      }
    }
  }, [isEdit, isReply]);

  useEffect(() => {
    if (!focused) {
      if (value === "") {
        setReset();
      }
    }
  }, [focused, value]);

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === "") {
      return;
    }

    if (isEdit) {
      if (!commentNumber) {
        return;
      }
      update({ content: value, commentNumber });
      if (updateMutation.isSuccess) setIsToastShow(true);
    } else {
      post({ content: value, parentNumber });
    }
    setValue("");
    setReset();
  };

  return isGuestUser() ? (
    <Container
      paddingBottom={paddingBottom}
      paddingTop={paddingTop}
      onClick={() => {
        localStorage.setItem("loginPath", pathname);
        router.push("/login");
      }}
    >
      <CommentInput setReset={setReset} placeholder="로그인 후 댓글을 달아보세요." readOnly />
    </Container>
  ) : (
    <Container onSubmit={submitComment} paddingBottom={paddingBottom} paddingTop={paddingTop}>
      <CommentInput
        setReset={setReset}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={inputRef}
        placeholder={isGuestUser() ? "로그인 후 댓글을 달아보세요." : "댓글을 입력해주세요."}
        onChange={handleInput}
        value={value}
      />

      <ResultToast bottom="80px" isShow={isToastShow} setIsShow={setIsToastShow} text="댓글이 수정되었어요." />
    </Container>
  );
};

const Container = styled.form<{
  paddingBottom: number;
  paddingTop: number;
}>`
  display: flex;
  align-items: center;
  left: 0;
  bottom: 0;
  @media (max-width: 440px) {
    width: 100svw;
  }
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;

    transform: translateX(-50%);
  }

  position: fixed;
  padding: 0 24px;
  background-color: white;
  padding-top: ${(props) => Math.abs(props.paddingTop / 844) * 100}svh;
  padding-bottom: ${(props) => Math.abs(props.paddingBottom / 844) * 100}svh;
  width: 100%;
`;

export default CommentForm;
