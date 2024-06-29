import { NextResponse } from "next/server";
import { cookies } from "next/headers";

//import { getCookies } from "@/components/getCookies";

export async function POST(request: Request) {
  const data = await request.json();
  if (data.isTesting) {
    console.log("proceso de testing");
    console.log(data);

    let url1 =
      data.central_url + "/oauth2/token?client_id=" + data.client_id + "&client_secret=" + data.client_secret + "&grant_type=refresh_token" + "&refresh_token=" + data.tokens_params.refresh_token;
    const res = await fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.access_token,
      },
    });
    const respuesta = await res.json();
    //console.log("Respuesta:", respuesta);

    return NextResponse.json(respuesta);
  }

  /*
  if (data && data.central_url) {
    
    const centralURL = data?.central_url;

    let url1 = centralURL + "/oauth2/token?client_id=" + data.client_id + "&client_secret=" + data.client_secret + "&grant_type=refresh_token" + "&refresh_token=" + data.tokens_params.refresh_token;

    console.log(url1);

    const res = await fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.access_token,
      },
    });
    const resultado = await res.json();
    console.log("Refresh Token:", resultado);
    console.log("Refresh Token2:", data);

    if (resultado.refresh_token) {
      console.log("Parseo la actualización del token");
      data.tokens_params.refresh_token = resultado.refresh_token;
      data.tokens_params.access_token = resultado.access_token;
      data.tokens_params.created_at = Date.now() + new Date().getTimezoneOffset() * 60000;

      console.log("Nueva cookie actualizada", data);
    } else {
      console.log("---- No he podido actualizar porque no viene el fresh token -----");
    }

    //const cookieStore = cookies();
    //cookieStore.set("central-auth-token2", data);
    return Response.json(data);

    //return response;
  }
    */
}
