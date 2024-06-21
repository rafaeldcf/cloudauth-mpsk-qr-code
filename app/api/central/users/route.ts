import { NextResponse } from "next/server";
import { getCookies } from "@/components/getCookies";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const named_mpsk = searchParams.get("named_mpsk");

  const cookiesData = getCookies();
  console.log("Users CookiesData:", cookiesData);
  if (cookiesData?.tokens_params.access_token) {
    //console.log(cookiesData.central_url);
    //const namedMPSK = request.named_mpsk;
    const centralURL = cookiesData.central_url;
    const url1 = centralURL + "/cloudAuth/api/v2/mpsk/" + named_mpsk + "/namedMPSK?limit=10";
    const token = cookiesData?.tokens_params.access_token;
    const res = await fetch(url1, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      cache: "no-cache",
    });

    const data = await res.json();
    return Response.json({ data });
  }
}

export async function POST(req: Request) {
  const cookiesData = getCookies();
  if (cookiesData?.tokens_params.access_token) {
    const request = await req.json();
    const namedMPSK = request.named_mpsk;
    const centralURL = cookiesData.central_url;
    const url1 = centralURL + "/cloudAuth/api/v2/mpsk/" + namedMPSK + "/namedMPSK";
    const token = cookiesData?.tokens_params.access_token;
    const body = request.body;
    const res = await fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    return Response.json({ data });
  }
}
