"use client";
import styled from "@emotion/styled";
import Badge from "./designSystem/Badge";
import PersonIcon from "./icons/PersonIcon";
import BoxLayoutTag from "./designSystem/tag/BoxLayoutTag";
import { palette } from "@/styles/palette";
import PlaceIcon from "./icons/PlaceIcon";
import { authStore } from "@/store/client/authStore";
interface HorizonBoxProps {
  travelNumber: number;
  daysLeft: number;
  title: string;
  recruits: number;
  total: number;
  location?: string;
  userName: string;
  daysAgo: string;
  imgSrc?: string; // 이미지 없는 경우 대비.
  tags: string[];
  bookmarked: boolean;
  bookmarkTabActive?: boolean; // false면 수정 삭제 버튼 생김.
}
// 내 여행에서 사용할 박스 레이아웃 입니다! *********************
// 사용 방식
{
  /* <HorizonBoxLayout
        daysLeft={40}
        title="먹고죽는 유럽여행"
        recruits={2}
        total={5}
        imgSrc="/경로"
        description="바게트만 부시는 테마 여행 갈사람 여기..."
        userName="김모잉"
        daysAgo={3}
        tags={array}
      /> */
}

const MyTripHorizonBoxLayout = ({
  travelNumber,
  daysLeft,
  title,
  recruits,
  total,
  location = "",
  userName,
  daysAgo,
  imgSrc = "",
  tags,
  bookmarked,
  bookmarkTabActive = false,
}: HorizonBoxProps) => {
  const { accessToken, userId } = authStore();
  const cutTags = tags.length > 2 ? tags.slice(0, 2) : tags;

  return (
    <HorizonBoxContainer>
      {/* <Thumbnail src={imgSrc}></Thumbnail> */}

      <PostInfo>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px 0px",
          }}
        >
          <Badge
            height={"22px"}
            text={
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.75 5.49259C11.75 9.31077 6.75 12.5835 6.75 12.5835C6.75 12.5835 1.75 9.31077 1.75 5.49259C1.75 4.19062 2.27678 2.94197 3.21447 2.02134C4.15215 1.1007 5.42392 0.583496 6.75 0.583496C8.07608 0.583496 9.34785 1.1007 10.2855 2.02134C11.2232 2.94197 11.75 4.19062 11.75 5.49259Z"
                    stroke="#3E8D00"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.75 7.0835C7.57843 7.0835 8.25 6.41192 8.25 5.5835C8.25 4.75507 7.57843 4.0835 6.75 4.0835C5.92157 4.0835 5.25 4.75507 5.25 5.5835C5.25 6.41192 5.92157 7.0835 6.75 7.0835Z"
                    stroke="#3E8D00"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div>{location}</div>
              </div>
            }
            backgroundColor={palette.keycolorBG}
            color={`${palette.keycolor}`}
            isDueDate={false}
          />
          {/* <button
            style={{ display: 'flex' }}
            onClick={bookmarkClickHandler}>
            {bookmarked ? (
              <div>
                <FullHeartIcon
                  width={24}
                  height={21.4}
                />
              </div>
            ) : (
              <div>
                <EmptyHeartIcon
                  width={24}
                  height={21.4}
                  stroke={`${palette.비강조3}`}
                />
              </div>
            )}
            {!bookmarkTabActive && (
              <div
                onClick={editOrDeleteClickHandler}
                style={{ marginLeft: '10px' }}>
                <MoreIcon stroke={palette.비강조2} />
              </div>
            )}
          </button> */}
        </div>

        <div>
          <TitleBox>
            <Title>{title}</Title>
          </TitleBox>
          {/* <Description>{description}</Description> */}
          <UserBox>
            <UserName>{userName}</UserName>
            <div
              style={{
                fontWeight: 500,
                fontSize: "14px",
                color: palette.비강조3,
              }}
            >
              ·
            </div>
            <PersonIcon width={11} height={14} stroke={`${palette.비강조}`} />
            <Recruiting>
              {recruits}/{total}
            </Recruiting>
            <div
              style={{
                fontWeight: 500,
                fontSize: "14px",
                color: palette.비강조3,
              }}
            >
              ·
            </div>
            <DaysAgo style={{ fontSize: "14px", fontWeight: 40 }}>{daysAgo}</DaysAgo>
          </UserBox>
        </div>
        <Tags>
          <BoxLayoutTag
            text={
              <Location>
                <PlaceIcon height={12} width={10} />
                <div>{location}</div>
              </Location>
            }
          />
          {cutTags.map((text: string, idx) => (
            <BoxLayoutTag text={text} />
          ))}
          {tags.length > cutTags.length ? (
            <BoxLayoutTag
              addStyle={{
                backgroundColor: `${palette.비강조4}`,
                padding: "4px 6px 4px 6px",
                color: `${palette.비강조}`,
                height: "22px",
                borderRadius: "20px",
                fontSize: "12px",
              }}
              text={`+${tags.length - cutTags.length}`}
            />
          ) : null}
        </Tags>
      </PostInfo>
    </HorizonBoxContainer>
  );
};
const DaysAgo = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  text-align: left;
  color: ${palette.비강조};
`;
const HorizonBoxContainer = styled.div`
  width: 100%;
  /* height: 120px; */
  display: flex;
  justify-content: space-between;
`;
const TitleBox = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: left;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 400;

  color: rgba(132, 132, 132, 1);
  white-space: nowrap; //텍스트가 한 줄로 유지되도록 설정
  overflow: hidden;
  text-overflow: ellipsis; // 텍스트가 잘릴 때 줄임표(...)를 표시
  margin-bottom: 4px;
  line-height: 16.71px;
`;
const Thumbnail = styled.div<{ src: string }>`
  margin-right: 12px;
  width: 100%;
  max-width: 120px;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  position: relative;

  border-radius: 20px;
  background-image: url(${(props) => props.src});
  background-color: ${(props) => (props.src === "" ? "rgba(217, 217, 217, 1)" : "inherit")};
  background-size: cover;
`;
const RecruitingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Recruiting = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: ${palette.비강조};
  padding-left: 1.6px;
  line-height: 14.32px;
`;
const PostInfo = styled.div`
  width: 100%;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const UserBox = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: start;
  border-bottom: 1px solid var(--4, #f0f0f0);
  padding-bottom: 8px;
`;
const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.기본};
`;
const Tags = styled.div`
  display: flex;
  justify-content: space-betweens;
`;
export default MyTripHorizonBoxLayout;
