import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookies } from "./components/getCookies";

import { useRenewCentralTokens } from "@/utils/requests/centralTokens";

const MAX_TIME_REFRESH = 15 * 60;
//const MAX_TIME_REFRESH = 0;

export async function middleware(request: NextRequest) {
  const cookiesData = getCookies();
  //console.log("Si:", cookiesData);
  if (cookiesData && cookiesData.tokens_params) {
    //   if (userCredentials.tokenExpires - (Date.now() + MAX_TIME_REFRESH) < 0) {

    //    console.log(cookiesData.tokens_params);
    if (cookiesData.tokens_params) {
      const tokenExpires = cookiesData.tokens_params.created_at + cookiesData.tokens_params.expires_in * 1000;
      console.log("Created at:", cookiesData.tokens_params.created_at);
      console.log("Expires in:", cookiesData.tokens_params.expires_in);
      console.log("Fecha will Expires in:", tokenExpires);
      console.log("Ahora:", Date.now());
      console.log("Ahora corregido:", Date.now() + new Date().getTimezoneOffset() * 60000);
      console.log("Diferencia Ahora - expiracion:", (Date.now() - tokenExpires) / 1000 / 60);
      //if (tokenExpires - (Date.now() + MAX_TIME_REFRESH) < 0) {
      const ahoraCorregido = Date.now() + new Date().getTimezoneOffset() * 60000;
      if (ahoraCorregido > tokenExpires) {
        console.log("Expired Token.");
        await refresh(cookiesData);
      } else {
        console.log("token valido");
      }
    }
  }
  //return NextResponse.redirect(new URL("/home", request.url));
  const response = NextResponse.next();
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!_next/image|favicon.ico).*)"],
};

async function refresh(inputData: any) {
  const refreshToken = async () => {
    const response = await fetch(process.env.WEB_URL + "/api/central/tokens", { method: "POST", body: JSON.stringify(inputData) });
    //console.log("refresh:", response);
  };
  return refreshToken();
}
