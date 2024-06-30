import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const data = await request.json();
  if (data.isTesting) {
    console.log("proceso de testing");
    console.log(data);

    let url1 =
      data.central_url + "/oauth2/token?client_id=" + data.client_id + "&client_secret=" + data.client_secret + "&grant_type=refresh_token" + "&refresh_token=" + data.tokens_params.refresh_token;
    try {
      const res = await fetch(url1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.access_token,
        },
      });
      console.log("ok??", res.ok);
      const respuesta = await res.json();
      return NextResponse.json(respuesta);
    } catch (error) {
      return NextResponse.json({ error: "Bad Request, check configuration" });
    }
  }
}
