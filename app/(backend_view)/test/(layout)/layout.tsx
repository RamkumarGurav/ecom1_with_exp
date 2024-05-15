import DashNavbar3 from "@/components/Layout/Backend/Navbar/DashNavbar3";
import NextTopLoader from "nextjs-toploader";
import { cookies, headers } from "next/headers";

export const dynamic = "force-dynamic";

/* =======================================================================
  to fetch data from protected routes always attach the required 
  cookies that are stored in the browser(when you make a request to protected
  routes naturally cookies or not attched to it we have to manually attach
  required headers and cookies
          )
     ======================================================================= */
// async function fetchData(path: string) {
//   const res = await fetch(path, {
//     method: "GET",
//     headers: { Cookie: cookies().toString() },
//     credentials: "include", // Ensure cookies are sent in the request
//   });

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return await res.json();
// }

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* =======================================================================
          in 2 ways we can get the user-data from request headers
     ======================================================================= */
  //  1)))
  let userData = headers().get("x-user-data")
    ? JSON.parse(headers().get("x-user-data")!)
    : null;

  // 2)))
  //==]

  // const headersList = headers();
  // const baseUrl = headersList.get("x-base-url"); // to get url

  // const skillsRes = await fetchData(`${baseUrl}api/v1/skills/authorised`);
  // const projectsRes = await fetchData(`${baseUrl}api/v1/projects/authorised`);
  // const applicationsRes = await fetchData(
  //   `${baseUrl}api/v1/job-applications/authorised`
  // );

  // console.log(applicationsRes);

  return (
    <div className={`overflow-hidden w-full `}>
      <NextTopLoader color="#007bff" />
      <DashNavbar3
        userData={{ name: "ram" }}
        // projectsRes={projectsRes}
        // skillsRes={skillsRes}
        // applicationsRes={applicationsRes}
      >
        {children}
      </DashNavbar3>
    </div>
  );
}
