import { NextResponse } from "next/server";
//import { getCookies } from "@/components/getCookies";

export async function POST(request: Request) {
  const data = await request.json();

  if (data && data.central_url) {
    const centralURL = data?.central_url;

    let url1 = centralURL + "/oauth2/token?client_id=" + data.client_id + "&client_secret=" + data.client_secret + "&grant_type=refresh_token" + "&refresh_token=" + data.tokens_params.refresh_token;

    //console.log(url1);

    const res = await fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.access_token,
      },
    });
    const resultado = await res.json();
    console.log("Refresh Token:", resultado);

    if (resultado.refresh_token) {
      console.log("Parseo la actualización del token");
      data.tokens_params.refresh_token = resultado.refresh_token;
      //data.tokens_params.refresh_token = "asd";
      data.tokens_params.access_token = resultado.access_token;
      console.log("Nueva cookie actualizada", data);
    }

    const response = NextResponse.json(resultado, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    response.cookies.set({
      name: "central-auth-token",
      path: "/",
      value: JSON.stringify(data),
    });

    return response;
  }
}
