"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "./LoadingButton";
import { Button, ButtonProps } from "../ui/button";
import { toast } from "react-hot-toast";
import { deleteCookie } from "@/server-actions/deleteCookie";
import { deleteAuthUser } from "@/lib/redux-store/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux-store/store";

export default function LogoutButton({
  children,
  className = "",
  variant = "default",
}: ButtonProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const doLogout = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/logout`,
      { credentials: "include" }
    );

    return await res.json();
  };
  const handleLogout = async () => {
    // await doLogout();
    //then deleting the session cookie from the our site
    await deleteCookie("session");
    dispatch(deleteAuthUser());
    window.localStorage.clear();
    router.push("/auth/login");
    toast.success("Logged Out");
  };
  return (
    <Button variant={variant} onClick={handleLogout} className={`${className}`}>
      {children}
    </Button>
  );
}
