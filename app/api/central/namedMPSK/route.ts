import { NextResponse } from "next/server";
import { getCookies } from "@/components/getCookies";
export async function GET() {
  const cookiesData = getCookies();
  if (cookiesData?.tokens_params.access_token) {
    const central_url = cookiesData.central_url;
    const url1 = central_url + "/cloudAuth/api/v2/mpsk";
    const token = cookiesData?.tokens_params.access_token;
    const res = await fetch(url1, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();

    return Response.json({ data });
  }
}
