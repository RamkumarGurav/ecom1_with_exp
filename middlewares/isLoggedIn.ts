import { NextRequest, NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { decrypt, encrypt } from "@/lib/auth/auth";

export async function isLoggedIn(
  req: Request,
  res: NextResponse,
  allowedRoles: string[]
) {
  const headersList = headers();
  const cookieStore = cookies();
  let token;
  if (
    headersList.get("Authorization") &&
    headersList.get("Authorization")?.startsWith("Bearer")
  ) {
    token = headersList.get("Authorization")?.split(" ")[1]; //jwt token that is sent in headers authorization field
  } else if (cookieStore.get("session")) {
    //if there is jwt in cookie
    token = cookieStore.get("session")?.value;
  }

  if (!token) {
    return false;
  }

  // console.log("user from google", req.user);

  const jwtPayload = await decrypt(token);
  const userData = { ...jwtPayload.data };

  if (!userData) {
    return false;
  }

  return res;
}
