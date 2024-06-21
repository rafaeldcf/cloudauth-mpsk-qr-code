import { getCookies } from "@/components/getCookies";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  //console.log("request data:", data);
  const tokensResponse = data;
  const response = NextResponse.json(tokensResponse, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  response.cookies.set({
    name: "central-auth-token",
    path: "/",
    value: JSON.stringify(tokensResponse),
  });
  return response;
}

export async function GET(request: Request) {
  const cookies = getCookies();

  return NextResponse.json({ cookies });
}
