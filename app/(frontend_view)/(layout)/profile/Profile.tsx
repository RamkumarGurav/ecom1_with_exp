"use client";

import { useAppSelector } from "@/lib/redux-store/store";
import { useEffect, useState } from "react";

export default function Profile() {
  const authUser = useAppSelector((state) => state.auth);
  // const [userData, setUserData] = useState<any>(null);

  // useEffect(() => {
  //   const user = JSON.parse(String(window.localStorage.getItem("userData")));
  //   setUserData(user);
  // }, []);

  // Store userData in localStorage

  return <div>Name:{authUser?.name}</div>;
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
