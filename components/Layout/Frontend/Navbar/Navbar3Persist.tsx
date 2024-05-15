"use client";
import StoreProvider from "@/lib/redux-store/StoreProvider";
import Navbar3 from "./Navbar3";

export default function Navbar3Persist() {
  return (
    <StoreProvider>
      <Navbar3 />
    </StoreProvider>
  );
}
