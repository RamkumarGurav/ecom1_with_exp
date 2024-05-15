"use client";

import Loading from "@/app/(backend_view)/loading";
import { fetcher } from "@/lib/helpers/fetcher";
import { storeAuthUser } from "@/lib/redux-store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux-store/store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export default function LoginSuccessPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // const user = useAppSelector(selectUser);
  const {
    data: userData,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login/success`, {
        credentials: "include",
      }),
  });

  if (isError) {
    throw new Error(error.message);
  }

  if (isLoading || !userData) {
    return <Loading />;
  }

  const pl = {
    name: userData.data.name,
    email: userData.data.email,
    image: userData.data.image.imageUrl,
    role: userData.data.role,
    isAuthenticated: true,
    session: userData.session,
  };
  dispatch(storeAuthUser(pl));
  window.localStorage.setItem("userData", JSON.stringify(userData.data)); // Store userData in localStorage

  router.push("/");
  return (
    <section
      id="Section"
      className={`bg-gray-300 py-[35px] sm:py-[50px] px-2 sm:px-[35px] xl:px-[70px] min-h-screen  
    |||  flex flex-col justify-center items-center`}
    >
      {userData.success ? (
        <div>
          <title>Login Sucess</title>
          <h1>Login Success</h1>
        </div>
      ) : (
        <div>
          <title>Login Failed</title>
          <h1>Login Failed</h1>
        </div>
      )}
    </section>
  );
}
/*****************************************************
      other
 ****************************************************/
// async function getData() {
//   const res = await fetch("http://localhost:8000/api/v1/users/login/success", {
//     credentials: "include",
//   });
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   const resJson = await res.json();
//   console.log("resJson", resJson);
//   if (resJson.status == false) {
//     return null;
//   }
//   return resJson.data;
// }
