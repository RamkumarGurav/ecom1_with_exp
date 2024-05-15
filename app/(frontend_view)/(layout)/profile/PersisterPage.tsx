"use client";

import StoreProvider from "@/lib/redux-store/StoreProvider";
import { useAppSelector } from "@/lib/redux-store/store";
import Profile from "./Profile";

export default function PersisterPage() {
  return (
    <StoreProvider>
      <Profile />
    </StoreProvider>
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
