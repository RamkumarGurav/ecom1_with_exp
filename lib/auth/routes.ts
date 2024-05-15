export const fvPublicRoutes = ["/"];
export const fvAuthRoutes = ["/auth/login", "/auth/register"];
export const bvAuthRoutes = [
  "/secure-region/auth/login",
  "/secure-region/auth/register",
];

export const fvAuthPrefix = "/auth";
export const bvAuthPrefix = "/secure-region/auth";

export const fvProtectedRoutes = [
  "/users",
  "/orders",
  "/products/:id",
  "/profile",
];
export const bvRestrictedRoutePrefix = "/secure-region/dashboard";

export const DEFAULT_BV_LOGIN_REDIRECT = "/secure-region/dashboard";
export const DEFAULT_FV_LOGIN_REDIRECT = "/";
