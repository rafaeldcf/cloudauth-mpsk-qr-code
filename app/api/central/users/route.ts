import { NextResponse } from "next/server";
import { getCookies } from "@/components/getCookies";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const named_mpsk = searchParams.get("named_mpsk");

  const cookieStore = cookies();
  const hasCookie = cookieStore.has("central-auth-token");
  if (hasCookie) {
    const lecturaCookies = cookieStore.get("central-auth-token");
    const cookieValue = lecturaCookies?.value!;
    const cookieJson = JSON.parse(cookieValue);

    console.log("Users CookiesData:", cookieJson);
    if (cookieJson?.tokens_params.access_token) {
      //console.log(cookiesData.central_url);
      //const namedMPSK = request.named_mpsk;
      const centralURL = cookieJson.central_url;
      const url1 = centralURL + "/cloudAuth/api/v2/mpsk/" + named_mpsk + "/namedMPSK?limit=10";
      const token = cookieJson?.tokens_params.access_token;
      const res = await fetch(url1, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        cache: "no-cache",
      });

      const data = await res.json();
      return NextResponse.json({ data });
    }
  }
}

export async function POST(req: Request) {
  //const cookiesData = getCookies();

  const cookieStore = cookies();
  const hasCookie = cookieStore.has("central-auth-token");
  if (hasCookie) {
    const lecturaCookies = cookieStore.get("central-auth-token");
    const cookieValue = lecturaCookies?.value!;
    const cookieJson = JSON.parse(cookieValue);
    if (cookieJson?.tokens_params.access_token) {
      const request = await req.json();
      const namedMPSK = request.named_mpsk;
      const centralURL = cookieJson.central_url;
      const url1 = centralURL + "/cloudAuth/api/v2/mpsk/" + namedMPSK + "/namedMPSK";
      const token = cookieJson?.tokens_params.access_token;
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

      return NextResponse.json({ data });
    }
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const named_mpsk = searchParams.get("named_mpsk");
  const user_id = searchParams.get("user_id");

  //const cookiesData = getCookies();
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("central-auth-token");
  if (hasCookie) {
    const lecturaCookies = cookieStore.get("central-auth-token");
    const cookieValue = lecturaCookies?.value!;
    const cookieJson = JSON.parse(cookieValue);
    if (cookieJson && cookieJson?.tokens_params?.access_token != "") {
      const centralURL = cookieJson?.central_url;

      const url1 = centralURL + "/cloudAuth/api/v2/mpsk/" + named_mpsk + "/namedMPSK" + "/" + user_id;

      const token = cookieJson?.tokens_params.access_token;

      const res = await fetch(url1, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      return NextResponse.json({ status: res.status });
    }
  }
}
