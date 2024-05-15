"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { MdOutlineArrowCircleUp } from "react-icons/md";
import { BiSolidArrowToTop } from "react-icons/bi";
import { LuArrowUpToLine } from "react-icons/lu";
import { IoIosArrowUp } from "react-icons/io";
export default function ScrollToTop() {
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    let vh = window.innerHeight;
    const handleScroll = () => {
      if (window.scrollY > 2 * vh) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {showBtn && (
        <div
          className={`p-4  flex justify-center items-center  
        ||| fixed bottom-2 lg:bottom-16 right-0 z-[99999] 
         ||| cursor-pointer
         `}
        >
          <Link
            href="#body"
            className={`  rounded-full bg-black/80 shadow shadow-white p-1`}
          >
            <BiSolidArrowToTop
              className={`text-[25px] text-color1 hover:text-red-500 `}
            />
          </Link>
        </div>
      )}
    </>
  );
}
