import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  {
    /*
  const cookiesData = getCookies();
  //console.log("Si:", cookiesData);
  const response = NextResponse.next();
  if (cookiesData && cookiesData.tokens_params) {
    //   if (userCredentials.tokenExpires - (Date.now() + MAX_TIME_REFRESH) < 0) {

    //    console.log(cookiesData.tokens_params);

    if (cookiesData.tokens_params) {
      const tokenExpires = cookiesData.tokens_params.created_at + cookiesData.tokens_params.expires_in * 1000;
      //console.log("Created at:", cookiesData.tokens_params.created_at, " - ", new Date(cookiesData.tokens_params.created_at));
      //console.log("Expires in:", cookiesData.tokens_params.expires_in);
      //console.log("Fecha will Expires in:", tokenExpires, " - ", new Date(tokenExpires));
      //console.log("Ahora:", Date.now());
      //console.log("Ahora corregido:", Date.now() + new Date().getTimezoneOffset() * 60000, " - ", new Date());
      
      const tiempoRestante = Date.now() - tokenExpires;
      
      //console.log("Tiempo restante:", tiempoRestante);
      //console.log("Diferencia Ahora - expiracion (minutos):", (Date.now() - tokenExpires) / 1000 / 60);
      
      //if (tokenExpires - (Date.now() + MAX_TIME_REFRESH) < 0) {
      const ahoraCorregido = Date.now() + new Date().getTimezoneOffset() * 60000;
      if (tiempoRestante > 0) {
        console.log("Expired Token.");
        
        //const resultTokenUpdated = await fetch(process.env.WEB_URL + "/api/central/tokens", { method: "POST", body: JSON.stringify(cookiesData) });
        //const respuesta2 = await resultTokenUpdated.json();
        //console.log("resultado devuelto:", respuesta2);
        //const cookiesData2 = getCookies();
        //console.log("Nuevas cookies2:", cookiesData2);
        //response.cookies.set({
          //name: "central-auth-token3",
          //path: "/",
          //value: JSON.stringify(resultTokenUpdated),
        //});
        

        //const resultTokenUpdated = await fetch(process.env.WEB_URL + "/api/central/tokens", { method: "POST", body: JSON.stringify(cookiesData) });
        //const respuesta2 = await resultTokenUpdated.json();
        //console.log("<<<<<<<resultado devuelto:", respuesta2);
        //const cookiesData3 = getCookies();
        //console.log("Nuevas cookies2:", cookiesData3);
        
        //response.cookies.set({
          //name: "central-auth-token3",
          //path: "/",
          //value: JSON.stringify({ "123": "123" }),
        //});
        

        const cookiesData2 = getCookies();
        //console.log("Cookies actuales:", cookiesData2);

        const response = NextResponse.next();

        response.cookies.set({
          name: "central-auth-token",
          value: JSON.stringify(respuesta2),
        });
      } else {
        //console.log("token valido");

        return response;
      }
    }
  }
  //return NextResponse.redirect(new URL("/home", request.url));

  */
  }

  // Si no hay cookies, le mandamos a la pagina de config
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("central-auth-token");
  if (!hasCookie && request.nextUrl.pathname != "/config") {
    return NextResponse.redirect(new URL("/config", request.url));
  }
  console.log("--- vamos por el middleware ---", request.url);

  // si no hay otra cosa, redireccionamos al destino que sea
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
  //matcher: ["/((?!_next/image|favicon.ico).*)"],
  matcher: ["/((?!.*\\.webmanifest|api|_next/static|_next/image|.*\\.png$).*)"],
  //matcher: ["/((?!.*\\.webmanifest|_next/static|_next/image|.*\\.png$).*)"],
};

/*
async function refresh(inputData: any) {
  const refreshToken = async () => {
    const response = await fetch(process.env.WEB_URL + "/api/central/tokens", { method: "POST", body: JSON.stringify(inputData) });
    //console.log("refresh:", response);
  };
  return refreshToken();
}
*/
