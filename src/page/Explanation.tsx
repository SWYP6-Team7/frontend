import { postContact } from "@/api/contact";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import TextareaField from "@/components/designSystem/input/TextareaField";
import Spacing from "@/components/Spacing";
import RequestError from "@/context/ReqeustError";
import { IContactCreate } from "@/model/contact";
import { authStore } from "@/store/client/authStore";
import { myPageStore } from "@/store/client/myPageStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Explanation = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const { email } = myPageStore();
  const { accessToken } = authStore();

  const createContact = useMutation({
    mutationFn: async (data: IContactCreate) => {
      const result = await postContact(data, accessToken);
      return result as any;
    },

    mutationKey: ["createContact"],
    onSuccess: (data) => {
      if (data.success) {
        setText("");
        router.push("/notification");
      } else {
        console.error(data.error.reason);
        throw new RequestError(data.error.reason);
      }
    },
    onError: (error: any) => {
      console.error(error);
      // throw new RequestError(error);
    },
  });
  const submitReport = (e: FormEvent) => {
    e.preventDefault();
    if (text === "" || email === "") return;
    createContact.mutateAsync({
      inquiryType: "계정 신고 및 차단 문의",
      email,
      title: "신고 5회 소명 사유",
      content: text,
    });
  };
  return (
    <Container>
      <Title>기타</Title>
      <Spacing size={16} />
      <TextareaField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="직접 입력 (최대 500자)"
        height="120px"
        placeholderColor={palette.비강조}
        isReport
        padding={"12px 16px"}
        lineHeight="20px"
        fontSize="14px"
      />

      <ButtonContainer>
        <Button
          onClick={submitReport}
          disabled={text === "" || email === ""}
          addStyle={
            text === "" || email === ""
              ? {
                  backgroundColor: "rgba(220, 220, 220, 1)",
                  color: "rgba(132, 132, 132, 1)",
                  boxShadow: "-2px 4px 5px 0px rgba(170, 170, 170, 0.1)",
                }
              : undefined
          }
          text={"신고하기"}
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 24px;
  padding-top: 8px;
  padding-bottom: 214px;
`;

const Title = styled.div`
  font-size: 18px;
  line-height: 36px;
  font-weight: 600;
  padding-left: 6px;
  display: flex;
  align-items: center;
`;

export default Explanation;
