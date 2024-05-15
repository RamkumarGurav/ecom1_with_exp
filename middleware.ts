import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_BV_LOGIN_REDIRECT,
  DEFAULT_FV_LOGIN_REDIRECT,
  bvAuthPrefix,
  bvAuthRoutes,
  bvRestrictedRoutePrefix,
  fvAuthPrefix,
  fvAuthRoutes,
  fvProtectedRoutes,
  fvPublicRoutes,
} from "./lib/auth/routes";
import { isAllowed } from "./middlewares/isAllowed";
import { isLoggedIn } from "./middlewares/isLoggedIn";
/*****************************************************
      helpers
 ****************************************************/
// Function to normalize URL path by removing trailing slashes
function normalizePath(path: string) {
  return path.replace(/\/+$/, ""); // Remove trailing slashes
}

// Function to check if the current URL path matches any of the protected paths
function isPathProtected(currentPath: string, protectedPaths: string[]) {
  // Normalize the current path by removing trailing slashes
  const normalizedCurrentPath = normalizePath(currentPath);

  // Iterate through each protected path
  for (const protectedPath of protectedPaths) {
    // Normalize the protected path by removing trailing slashes
    const normalizedProtectedPath = normalizePath(protectedPath);

    // Check if the protected path ends with '**'
    if (normalizedProtectedPath.endsWith("**")) {
      // Remove the '**' suffix for pattern matching
      const prefix = normalizedProtectedPath.slice(0, -2);

      // Check if the normalized current path starts with the prefix
      if (normalizedCurrentPath.startsWith(prefix)) {
        return true; // Match found, current path is protected
      }
    } else {
      // Convert protected path to a regular expression pattern
      const pathRegex = new RegExp(
        `^${normalizedProtectedPath.replace(/:\w+/g, "\\w+")}$`
      );

      // Check if the normalized current path matches the pattern
      if (pathRegex.test(normalizedCurrentPath)) {
        return true; // Match found, current path is protected
      }
    }
  }

  return false; // No match found, current path is not protected
}

/*****************************************************
      middleware
 ****************************************************/

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const res = NextResponse.next();
  const isAdminAllowed: any = await isAllowed(req, res, ["admin"]);
  const isUserAllowed: any = await isAllowed(req, res, ["user"]);

  /**
   *if the reqest route is backendView auth route like login,register then first check
   * if the admin is allready loggedin if he is loggedin then redirect him to dashboard
   * and if he is not logged in then dont allow the route
   */
  const isBVAuthRoute = nextUrl.pathname.startsWith(bvAuthPrefix);
  if (isBVAuthRoute) {
    console.log("inside isBVAuthRoute");
    if (isAdminAllowed == false) {
      return res;
    }
    return NextResponse.redirect(new URL(DEFAULT_BV_LOGIN_REDIRECT, nextUrl));
  }

  /**
   *if the reqest route is frontendView auth route like login,register then first check
   * if the user is allready loggedin if he is loggedin then redirect him to homepage
   * and if he is not logged in then dont allow the route
   */
  const isFVAuthRoute = nextUrl.pathname.startsWith(fvAuthPrefix);
  if (isFVAuthRoute) {
    if (isUserAllowed == false) {
      return res;
    }
    return NextResponse.redirect(new URL(DEFAULT_FV_LOGIN_REDIRECT, nextUrl));
  }

  /**
   *if the reqest route is frontend restricted route like dashboard then first check
   * if the user is allready loggedin and is admin, if he is loggedin admin  then allow him and
   * and if he is not logged admin in then redirect him to login page
   */
  const isBVRestrictedRoute = nextUrl.pathname.startsWith(
    bvRestrictedRoutePrefix
  );
  if (isBVRestrictedRoute) {
    if (isAdminAllowed == false) {
      return NextResponse.redirect(
        new URL("secure-region/auth/login", nextUrl)
      );
    }
    return isAdminAllowed;
  }

  /**
   *if the reqest route is frontendview protected route like users/profile then first check
   * if the user is allready loggedin and is user, if he is loggedin user  then allow him and
   * and if he is not logged user in then redirect him to login page
   */
  const isFVProtectedRoute = isPathProtected(
    nextUrl.pathname,
    fvProtectedRoutes
  );

  if (isFVProtectedRoute) {
    if (isUserAllowed == false) {
      return NextResponse.redirect(new URL("auth/login", nextUrl));
    }
    return isUserAllowed;
  }

  /**
   * allow all remain backend and frontend routes
   * */
  // console.log("inside outside");
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
