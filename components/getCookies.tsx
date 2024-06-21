import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export type cookieData = {
  client_id?: string;
  client_secret?: string;
  tokens_params?: any;
  central_url: string;
};

export function getCookies(): cookieData | null {
  const cookieName = "central-auth-token";

  // getting the tookes from the cookie
  const cookieStore = cookies();
  let tokens = cookieStore.get(cookieName)?.value;
  //console.log("getCookies File: Hay Tokens de " + cookieName + "?:", tokens);
  if (!tokens) return null;
  const credentials = JSON.parse(tokens) as cookieData;
  //console.log("credentials:", credentials);
  return credentials;
}
