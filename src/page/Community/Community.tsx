"use client";
import AlarmIcon from "@/components/icons/AlarmIcon";
import Spacing from "@/components/Spacing";

import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Navbar from "../Home/Navbar";
import SortHeader from "@/components/SortHeader";
import CreateTripButton from "../Home/CreateTripButton";
import CategoryList from "@/components/community/CategoryList";
import SearchIcon from "@/components/icons/SearchIcon";
import CommunityInfinite from "@/components/community/CommunityInfinite";
import ResultToast from "@/components/designSystem/toastMessage/resultToast";
import { editStore } from "@/store/client/editStore";
import { COMMUNITY_TOAST_MESSAGES } from "@/constants/toastMessages";
import { useBackPathStore } from "@/store/client/backPathStore";
import CustomLink from "@/components/CustomLink";
import { isGuestUser } from "@/utils/user";

const LIST = ["최신순", "추천순", "등록일순"];
const COMMUNITY_CATEGORY = ["전체", "잡담", "여행팁", "후기"];
const Community = () => {
  const searchParams = useSearchParams();
  const [fixed, setFixed] = useState(true);
  const pathname = usePathname();
  const category = searchParams?.get("categoryName") ?? "전체";
  const sort = searchParams?.get("sortingTypeName") ?? "최신순";
  const { setNotification } = useBackPathStore();
  const router = useRouter();
  const { setRemoveToastShow, removeToastShow } = editStore();
  const onClickSort = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());

    newSearchParams.set("sortingTypeName", value);

    router.push(pathname + "?" + newSearchParams);
  };
  const handleNotification = () => {
    setNotification("/community");
    router.push(`/notification`);
  };

  const onClickCategory = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());

    if (value === "잡담") {
      newSearchParams.set("categoryName", "잡담");
    } else if (value === "여행팁") {
      newSearchParams.set("categoryName", "여행팁");
    } else if (value === "후기") {
      newSearchParams.set("categoryName", "후기");
    } else {
      newSearchParams.set("categoryName", "전체");
    }
    router.push(pathname + "?" + newSearchParams);
  };

  const handleFixed = (type: boolean) => {
    setFixed(type);
  };

  return (
    <>
      <ResultToast
        bottom="80px"
        isShow={removeToastShow}
        setIsShow={setRemoveToastShow}
        text={COMMUNITY_TOAST_MESSAGES.deletePost}
      />
      <div>
        <SearchContainer>
          <Title>커뮤니티</Title>
          <IconContainer>
            <LinkContainer>
              <CustomLink to={`/search/community`}>
                <SearchIcon width={24} height={22} />
              </CustomLink>
            </LinkContainer>
            {!isGuestUser() && (
              <LinkContainer>
                <div onClick={handleNotification} style={{ cursor: "pointer" }}>
                  <AlarmIcon stroke={palette.기본} />
                </div>
              </LinkContainer>
            )}
          </IconContainer>
        </SearchContainer>

        <Spacing size={24} />
        <SortContainer>
          <SortHeader list={LIST} clickSort={onClickSort} setFixed={handleFixed} sort={sort}>
            <CategoryList type={category} setType={onClickCategory} list={COMMUNITY_CATEGORY} />
          </SortHeader>
        </SortContainer>
        <CommunityInfinite />
      </div>
      {fixed && <CreateTripButton type="community" />}
      <Navbar />
    </>
  );
};

const SearchContainer = styled.div`
  display: flex;
  padding: 0 24px;
  padding-top: 52px;
  height: 116px;
  align-items: center;
  gap: 22px;
  position: sticky;
  top: 0px;
  padding-bottom: 16px;
  background-color: ${palette.BG};
  z-index: 1000;
`;

const SortContainer = styled.div`
  padding: 0 24px;
  padding-bottom: 11px;
  border-bottom: 1px solid rgb(240, 240, 240);
  position: sticky;
  top: 100px;
  z-index: 1001;
  background-color: ${palette.BG};
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  flex: 1;
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

export default Community;
