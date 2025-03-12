import { NextRequest, NextResponse } from "next/server";

const EXAM_LIST1 = {
  resultType: "SUCCESS",
  success: {
    plans: [
      {
        planOrder: 1,
        spots: [
          {
            name: "Hanbat Arboretum",
            category: "Park",
            region: "Daejeon",
            latitude: "36.366850",
            longitude: "127.327000",
          },
          {
            name: "Expo Science Park",
            category: "Science Park",
            region: "Daejeon",
            latitude: "36.374392",
            longitude: "127.392820",
          },
          {
            name: "Hanbat Arboretum2",
            category: "Park",
            region: "Daejeon",
            latitude: "36.666850",
            longitude: "127.427000",
          },
          {
            name: "Expo Science Park2",
            category: "Science Park",
            region: "Daejeon",
            latitude: "36.674392",
            longitude: "127.292820",
          },
        ],
      },
      {
        planOrder: 2,
        spots: [
          {
            name: "Daejeon O-World",
            category: "Amusement Park",
            region: "Daejeon",
            latitude: "36.325891",
            longitude: "127.386530",
          },
        ],
      },
      {
        planOrder: 3,
        spots: [
          {
            name: "Jangtaesan Mountain Forest",
            category: "Forest",
            region: "Daejeon",
            latitude: "36.240000",
            longitude: "127.320000",
          },
        ],
      },
      {
        planOrder: 4,
        spots: [
          {
            name: "Daecheong Lake",
            category: "Lake",
            region: "Daejeon",
            latitude: "36.346390",
            longitude: "127.415955",
          },
        ],
      },
      {
        planOrder: 5,
        spots: [
          {
            name: "Hanbat Arboretum",
            category: "Park",
            region: "Daejeon",
            latitude: "36.366850",
            longitude: "127.327000",
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
            name: "Expo Science Park",
            category: "Science Park",
            region: "Daejeon",
            latitude: "36.374392",
            longitude: "127.392820",
          },
          {
            name: "Daejeon O-World",
            category: "Amusement Park",
            region: "Daejeon",
            latitude: "36.325891",
            longitude: "127.386530",
          },
        ],
      },
      {
        planOrder: 7,
        spots: [
          {
            name: "Jangtaesan Mountain Forest",
            category: "Forest",
            region: "Daejeon",
            latitude: "36.240000",
            longitude: "127.320000",
          },
        ],
      },
      {
        planOrder: 8,
        spots: [
          {
            name: "Daecheong Lake",
            category: "Lake",
            region: "Daejeon",
            latitude: "36.346390",
            longitude: "127.415955",
          },
        ],
      },
      {
        planOrder: 9,
        spots: [
          {
            name: "Hanbat Arboretum",
            category: "Park",
            region: "Daejeon",
            latitude: "36.366850",
            longitude: "127.327000",
          },
        ],
      },
      {
        planOrder: 10,
        spots: [
          {
            name: "Expo Science Park",
            category: "Science Park",
            region: "Daejeon",
            latitude: "36.374392",
            longitude: "127.392820",
          },
        ],
      },
    ],
    nextCursor: null,
  },
  error: null,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");
  if (cursor === "1") {
    return NextResponse.json(EXAM_LIST1);
  } else if (cursor === "2") {
    return NextResponse.json(EXAM_LIST2);
  } else {
    return NextResponse.json({
      resultType: "SUCCESS",
      erro: {
        reason: request.nextUrl,
      },
      success: null,
    });
  }
}
