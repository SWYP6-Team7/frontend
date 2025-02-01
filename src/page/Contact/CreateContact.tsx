"use client";
import { postContact } from "@/api/contact";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import InputField from "@/components/designSystem/input/InputField";
import TextareaField from "@/components/designSystem/input/TextareaField";
import ResultModal from "@/components/designSystem/modal/ResultModal";
import Select from "@/components/designSystem/Select";
import BoxLayoutTag from "@/components/designSystem/tag/BoxLayoutTag";
import Spacing from "@/components/Spacing";
import RequestError from "@/context/ReqeustError";
import { IContactCreate } from "@/model/contact";
import { authStore } from "@/store/client/authStore";
import { myPageStore } from "@/store/client/myPageStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";

const INQUIRYTYPE_LIST = ["계정 및 로그인", "서비스 이용 방법", "이용 불편 및 신고", "기타 문의"];

const CreateContact = () => {
  const { email: initEmail } = myPageStore();
  console.log("email", initEmail);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [inquiryType, setInquiryType] = useState<string>("계정 및 로그인");
  const [email, setEmail] = useState(initEmail ?? "");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const { accessToken } = authStore();
  const createContact = useMutation({
    mutationFn: async (data: IContactCreate) => {
      const result = await postContact(data, accessToken);
      return result.data;
    },
    mutationKey: ["createContact"],
    onSuccess: (data) => {
      if (data.success) {
        setIsResultModalOpen(true);
        setTitle("");
        setContent("");
        setInquiryType("계정 및 로그인");
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

  const submitContact = (e: FormEvent) => {
    e.preventDefault();
    createContact.mutateAsync({ inquiryType, email, title, content });
  };
  return (
    <>
      <Container>
        <InquiryTypeContainer>
          <Label htmlFor="inqueryType">문의 유형을 선택해주세요</Label>

          <Select
            id="inQueryType"
            width="100%"
            value={inquiryType}
            setValue={setInquiryType}
            list={INQUIRYTYPE_LIST}
          ></Select>
        </InquiryTypeContainer>
        <EmailContainer>
          <Label htmlFor="email">답변 받을 이메일</Label>
          {isChange || initEmail === "" ? (
            <InputField
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRemove={false}
            />
          ) : (
            <EmailBox>
              <EmailText>{email ?? ""}</EmailText>
              <div onClick={() => setIsChange(true)} style={{ cursor: "pointer" }}>
                <BoxLayoutTag
                  size="small"
                  text="변경하기"
                  addStyle={{
                    backgroundColor: "#fff",
                    border: `1px solid ${palette.비강조3}`,
                    color: palette.기본,
                    fontWeight: "400",
                  }}
                />
              </div>
            </EmailBox>
          )}
        </EmailContainer>
        <ContentContainer>
          <Label>문의 내용</Label>
          <InputField
            isRemove={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요. (최대 20자)"
          />
          <Spacing size={24} />
          <TextareaField
            placeholder={`내용을 자세하게 남겨주시면 정확한 답변에 도움이 됩니다. 문의 후 순차적으로 답변 드리고 있으니 조금만 기다려주세요!\n(최대 2,000자) `}
            height="255px"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </ContentContainer>
        <ButtonContainer>
          <Button
            onClick={submitContact}
            disabled={title === "" || content === "" || email === ""}
            addStyle={
              title === "" || content === "" || email === ""
                ? {
                    backgroundColor: "rgba(220, 220, 220, 1)",
                    color: "rgba(132, 132, 132, 1)",
                    boxShadow: "-2px 4px 5px 0px rgba(170, 170, 170, 0.1)",
                  }
                : undefined
            }
            text={"문의하기"}
          />
        </ButtonContainer>
      </Container>

      <ResultModal
        isModalOpen={isResultModalOpen}
        modalMsg={`문의 주신 내용 확인 후\n이메일로 답변 드리겠습니다`}
        modalTitle="문의 완료"
        setModalOpen={setIsResultModalOpen}
      />
    </>
  );
};

export default CreateContact;

const Container = styled.div`
  padding: 0 24px;
  min-height: 100%;
  overflow-y: auto;
  width: 100%;
`;

const InquiryTypeContainer = styled.div`
  margin: 24px 0;
`;

const EmailContainer = styled.div<{ isChange: boolean }>`
  margin-top: 24px;
  margin-bottom: ${(props) => (props.isChange ? "32px" : "47px")};
`;

const ContentContainer = styled.div`
  margin-bottom: 208px;
`;

const EmailBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const EmailText = styled.div`
  font-weight: 400;
  line-height: 16px;
  font-size: 16px;

  color: ${palette.비강조};
  padding: 8.5px 0;
  padding-left: 6px;
`;

const Label = styled.label`
  display: block;
  padding: 10px 6px;
  font-size: 16px;
  margin-bottom: 4px;
  line-height: 16px;
  letter-spacing: -0.025em;
  font-weight: 600;
`;
