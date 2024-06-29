import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("central-auth-token");
  if (hasCookie) {
    const lecturaCookies = cookieStore.get("central-auth-token");
    const cookieValue = lecturaCookies?.value!;

    const cookieJson = JSON.parse(cookieValue);

    if (cookieJson.tokens_params.access_token) {
      const central_url = cookieJson.central_url;
      const url1 = central_url + "/cloudAuth/api/v2/mpsk";
      const token = cookieJson?.tokens_params.access_token + "";
      const res = await fetch(url1, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      //console.log("api-central-namedMPSK:", data);
      return NextResponse.json(data);
    }
  }
  /*
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

    return NextResponse.json({ data });
  }
    */
}
