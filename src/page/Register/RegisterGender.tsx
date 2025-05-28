"use client";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { userStore } from "@/store/client/userStore";
import { useRegisterAge } from "./RegisterAge";
import { useRouter } from "next/navigation";

const RegisterGender = () => {
  const { setGenderCheck } = useRegisterAge();
  const {
    sex,
    addSex,
    name,
    email,
    agegroup,
    resetAge,
    resetName,
    resetForm,
    socialLogin,
    setSocialLogin,
  } = userStore();
  const [maleClicked, setMaleClicked] = useState(sex == "M" ? true : false);
  const [femaleClicked, setFemaleClicked] = useState(sex == "F" ? true : false);
  const router = useRouter();
  const isSocialLoginKakao = socialLogin === "kakao";
  const isSocialLoginNaver = socialLogin === "naver";
  const isSocialLoginGoogle = socialLogin === "google";

  const clickedMale = () => {
    if (!maleClicked) {
      setMaleClicked(true);
      setFemaleClicked(false);
      setGenderCheck(true);
      addSex("M");
    }
  };
  const clickedFemale = () => {
    if (!femaleClicked) {
      setFemaleClicked(true);
      setMaleClicked(false);
      setGenderCheck(true);
      addSex("F");
    }
  };

  useEffect(() => {
    if (isSocialLoginGoogle) {
      if (!agegroup) {
        resetAge();
        setSocialLogin(null, null);
        resetName();
        router.replace("/login");
      }
    } else if (isSocialLoginKakao) {
      if (!email || !agegroup) {
        resetName();
        resetForm();
        resetAge();
        router.replace("/registerEmail");
      }
    } else if (isSocialLoginNaver) {
      resetName();
      resetForm();
      resetAge();
      setSocialLogin(null, null);
      router.replace("/login");
    } else {
      if (!email || !name || !agegroup) {
        resetName();
        resetForm();
        resetAge();
        router.replace("/registerEmail");
      }
    }
  }, [email, name, agegroup, socialLogin]);

  // 이전 화면으로 돌아왔을 때, 이미 체크 했다면, true값을 할당해주기.
  useEffect(() => {
    if (!maleClicked && !femaleClicked) setGenderCheck(false);
    else setGenderCheck(true);
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <GenderContainer>
        <StepContent>성별을 선택해주세요.</StepContent>
        <GenderImgContainer>
          <MaleBox>
            <Male
              onClick={clickedMale}
              src={
                maleClicked
                  ? "/images/activeMale.png"
                  : "/images/defaultMale.png"
              }
              alt=""
            />
            <p
              style={
                maleClicked
                  ? { color: "black", fontWeight: 700 }
                  : { color: "rgba(171, 171, 171, 1)" }
              }
            >
              남자
            </p>
          </MaleBox>
          <FemaleBox>
            <Female
              onClick={clickedFemale}
              src={
                femaleClicked
                  ? "/images/activeFemale.png"
                  : "/images/defaultFemale.png"
              }
              alt=""
            />
            <p
              style={
                femaleClicked
                  ? { color: "black", fontWeight: 700 }
                  : { color: "rgba(171, 171, 171, 1)" }
              }
            >
              여자
            </p>
          </FemaleBox>
        </GenderImgContainer>
      </GenderContainer>
    </div>
  );
};

export default RegisterGender;

const fadeIn = keyframes`
  0% {
      opacity: 0;
      transform: translate3d(0, 20%, 0);
  }
  to {
      opacity: 1;
      transform: translateZ(10);
  }
`;
const GenderContainer = styled.div`
  height: 249px;
  margin-top: 54px;
  animation: ${fadeIn} 0.5s;
`;
const StepContent = styled.p`
  font-size: 24px;
  font-weight: 600;

  text-align: left;
`;
const GenderImgContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;
const MaleBox = styled.div`
  margin-right: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  p {
    margin-top: 8px;
    font-size: 18px;
  }
`;
const FemaleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  p {
    margin-top: 8px;
    font-size: 18px;
  }
`;

const Male = styled.img`
  width: 96px;
  height: 96px;
`;
const Female = styled.img`
  width: 96px;
  height: 96px;
`;
