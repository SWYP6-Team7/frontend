"use client";

import styled from "@emotion/styled";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchFilterTag from "../designSystem/tag/SearchFilterTag";
import { palette } from "@/styles/palette";

const FILTER_LIST = [
  { value: "세계", title: "세계" },
  { value: "국내", title: "국내" },
] as const;

export default function AriaFilter() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") ?? "세계";
  const router = useRouter();
  const pathname = usePathname();
  const clickTag = (value: "세계" | "국내") => () => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    console.log(newSearchParams);
    newSearchParams.set("filter", value);
    router.push(pathname + "?" + newSearchParams);
  };

  const isActive = (value: "세계" | "국내") => {
    return value === filter ? true : false;
  };

  return (
    <Container>
      {FILTER_LIST.map(({ title, value }, idx) => (
        <SearchFilterTag
          addStyle={{
            backgroundColor: isActive(value) ? "rgba(227, 239, 217, 1)" : " rgba(240, 240, 240, 1)",
            color: isActive(value) ? `${palette.keycolor}` : "rgba(52, 52, 52, 1)",

            border: isActive(value) ? `1px solid ${palette.keycolor}` : `1px solid ${palette.검색창}`,
            borderRadius: "30px",
            padding: "10px 20px",
            fontWeight: isActive(value) ? "600" : "400",
            lineHeight: "22px",
          }}
          text={title}
          onClick={clickTag(value)}
          idx={idx}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin-top: 8px;
  margin-bottom: 27px;
  gap: 12px;
`;
