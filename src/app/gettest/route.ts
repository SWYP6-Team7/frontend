import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

const EXAM_LIST1 = {
  resultType: "SUCCESS",
  success: {
    plans: [
      {
        planOrder: 1,
        spots: [
          {
            name: "Akihabara",
            category: "Shopping & Entertainment",
            region: "Tokyo",
            latitude: "35.6987",
            longitude: "139.7731",
          },
          {
            name: "Shibuya Crossing",
            category: "Landmark",
            region: "Tokyo",
            latitude: "35.6595",
            longitude: "139.7005",
          },
        ],
      },
      {
        planOrder: 2,
        spots: [
          {
            name: "Mount Fuji",
            category: "Nature",
            region: "Yamanashi",
            latitude: "35.3606",
            longitude: "138.7274",
          },
        ],
      },
      {
        planOrder: 3,
        spots: [
          {
            name: "Osaka Castle",
            category: "Historical Site",
            region: "Osaka",
            latitude: "34.6873",
            longitude: "135.5262",
          },
        ],
      },
      {
        planOrder: 4,
        spots: [
          {
            name: "Mount Fuji",
            category: "Nature",
            region: "Yamanashi",
            latitude: "35.3606",
            longitude: "138.7274",
          },
        ],
      },
      {
        planOrder: 5,
        spots: [
          {
            name: "Osaka Castle",
            category: "Historical Site",
            region: "Osaka",
            latitude: "34.6873",
            longitude: "135.5262",
          },
        ],
      },
    ],
    nextCursor: 2,
  },
  error: null,
};

const EXAM_LIST2 = {
  resultType: "SUCCESS",
  success: {
    plans: [
      {
        planOrder: 6,
        spots: [
          {
            name: "Akihabara",
            category: "Shopping & Entertainment",
            region: "Tokyo",
            latitude: "35.6987",
            longitude: "139.7731",
          },
          {
            name: "Shibuya Crossing",
            category: "Landmark",
            region: "Tokyo",
            latitude: "35.6595",
            longitude: "139.7005",
          },
        ],
      },
      {
        planOrder: 7,
        spots: [
          {
            name: "Mount Fuji",
            category: "Nature",
            region: "Yamanashi",
            latitude: "35.3606",
            longitude: "138.7274",
          },
        ],
      },
      {
        planOrder: 8,
        spots: [
          {
            name: "Osaka Castle",
            category: "Historical Site",
            region: "Osaka",
            latitude: "34.6873",
            longitude: "135.5262",
          },
        ],
      },
      {
        planOrder: 9,
        spots: [
          {
            name: "Mount Fuji",
            category: "Nature",
            region: "Yamanashi",
            latitude: "35.3606",
            longitude: "138.7274",
          },
        ],
      },
      {
        planOrder: 10,
        spots: [
          {
            name: "Osaka Castle",
            category: "Historical Site",
            region: "Osaka",
            latitude: "34.6873",
            longitude: "135.5262",
          },
        ],
      },
    ],
    nextCursor: null,
  },
  error: null,
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const cursor = new URL(request.url).searchParams.get("cursor");
  if (cursor === "1") {
    return NextResponse.json(EXAM_LIST1);
  } else if (cursor === "2") {
    return NextResponse.json(EXAM_LIST2);
  } else {
    return NextResponse.json({
      resultType: "SUCCESS",
      erro: {
        reason: "데이터 잘못 요청함",
      },
      success: null,
    });
  }
}
