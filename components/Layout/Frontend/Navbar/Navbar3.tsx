"use client";
import Link from "next/link";
import { ImFire } from "react-icons/im";
import { CircleUser } from "lucide-react";
import LogoutButton from "@/components/Buttons/LogoutButton";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux-store/store";
import StoreProvider from "@/lib/redux-store/StoreProvider";
import { ModeToggleButton } from "@/components/Buttons/ModeToggleButton";

export default function Navbar3() {
  const authUser = useAppSelector((state) => state.auth);

  return (
    <StoreProvider>
      <nav className={` bg-black dark:bg-white shadow   py-4 px-4`}>
        <div className={` px-4 flex justify-between items-center`}>
          <div>
            <ImFire size={30} className={`text-white dark:text-black`} />
          </div>

          <div className={`flex items-center  gap-x-10`}>
            <Link href="/" className="text-white hover:text-yellow-400">
              Home
            </Link>

            {authUser.isLoggedIn && (
              <Link href="/profile" className="hover:text-yellow-400">
                profile
              </Link>
            )}

            {authUser.isLoggedIn ? (
              <div className="flex gap-1">
                <span>
                  <CircleUser className="text-yellow-300" />
                </span>
                <span className="text-yellow-300 font-semibold">
                  {authUser?.name}
                </span>
              </div>
            ) : (
              ""
            )}

            {authUser.isLoggedIn ? (
              <LogoutButton variant="outline" className="text-black">
                Logout
              </LogoutButton>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" className="text-black">
                  Login
                </Button>
              </Link>
            )}
            <LogoutButton variant="outline" className="text-black">
              Logout x
            </LogoutButton>
            <ModeToggleButton />
          </div>
        </div>
      </nav>
    </StoreProvider>
  );
}
