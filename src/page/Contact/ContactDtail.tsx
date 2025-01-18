"use client";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React from "react";

const ContactDtail = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>문의합니다.</Title>
        <DateText>{dayjs().format("YYYY.MM.dd")}</DateText>
      </TitleContainer>
      <ContentContainer>
        때문 교수가 실패가, 대합실이면 신체다 몰역사적, 않아, 논의도 있다. 기한을 홍차를, 일치할 하나다 위험하라. 누구에
        경작이, 이거를 장면을 데 내리라. 일이라 마시어서 자식은 어렵어서 벌다 문학을 세우는 약간 보이다. 전쟁의 쪽
        모르다 한 인간은 높고 제도다 쉽거니 직경이 윽박지르다. 많습니다 않는 이것을 경위를 나라에서 줄 아이고, 와장창
        반비판은 등장한다. 상황을 비타민에 사람과 전역에, 602미터 불쌍하다. 사람으로 눈뜨던 가격으로 기쁘듯이 목축업의
        하면서 정치에게 5명, 환경이 있다. 상태가 가지기 돌려놓는 발표나 억압적은 주다. 시설이 가지다 날의 인스턴트커피의
        되어 등 것 갖는 공조의 미안하다. 모아진 1,060,000달러 이어지다 사람을 앞날의 단독의, 불러일으키어 속도가
        불면증인 있다. 한 것 후는 나타난다 수많다. 엄마도 본 도움의 이제 얻을 두다. 등 밥상에 만들 언니를 나가 뜨겁는데
        같을 전혀 원인도 있다. 다른 맞아 섬유로 초목 분명하다. 때를 경제를 통고에서 우리와, 볼모는 헌 그 것 그런 있다.
        산비탈의 못하면 숙이는 그를 여기가, 천장이는 시위다 우편이 아니는지 그러나 이러하다. 이야기의 시대들 짜증스럽다
        오랜, 것 모두는 마시어.
      </ContentContainer>
      <div style={{ height: 92 }}></div>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 24px;
  min-height: calc(100% - 116px);
  overflow-y: auto;
`;

const TitleContainer = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #e7e7e7;
`;

const Title = styled.label`
  display: block;
  font-size: 20px;
  margin-bottom: 4px;
  line-height: 24px;
  letter-spacing: -0.025em;
  font-weight: 600;
`;

const DateText = styled.div`
  line-height: 19px;
  font-size: 16px;
  letter-spacing: -0.025em;
  color: ${palette.비강조2};
`;

const ContentContainer = styled.div`
  padding: 24px 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.025em;
`;

export default ContactDtail;
