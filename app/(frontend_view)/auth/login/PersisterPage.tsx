"use client";

import StoreProvider from "@/lib/redux-store/StoreProvider";
import LoginCard from "./LoginCard";

export default function PersisterPage() {
  return (
    <StoreProvider>
      <LoginCard />
    </StoreProvider>
  );
}
