"use client";
import Link from "next/link";
import Image from "next/image";
import headerImg from "@/public/IMG_20221126_101739-removebg-preview.png";

import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <section
      id="navbar"
      className="py-5 px-[2vmax] lg:px-[4vmax]  bg-[#000000d0] w-full   
      
      sticky left-0 top-0 z-[9999]"
    >
      <div
        className=" px-4 pr-6  flex flex-col gap-5 
        lg:flex-row lg:justify-between lg:items-center 
        
        rounded-full bg-[#000000d0]  shadow shadow-white z-[9999]"
      >
        <div className="flex justify-between  items-center z-40 ">
          <Link
            href="/"
            className="text-xl  flex items-center font-bold rounded-2xl px-2 ubuntu text-[#fafafa] "
          >
            <Image src={"/rlogo1.png"} width={250} height={70} alt="logo" />
          </Link>

          <button
            className="HAMBURGER-ICON-MD ||  lg:hidden || space-y-[6px] p-1 || flex flex-col justify-center items-center"
            onClick={handleOpen}
          >
            <span
              className={` block ||  h-0.5 w-6  bg-gray-100 ||    transition-all duration-300  || ${
                open ? "-rotate-45 translate-y-2" : ""
              } `}
            ></span>
            <span
              className={` block ||  h-0.5 w-6  bg-gray-100 ||   transition-all origin-right  duration-300    || ${
                open ? "w-0 bg-transparent" : ""
              }  `}
            ></span>
            <span
              className={` block ||  h-0.5 w-6  bg-gray-100 ||    transition-all duration-300  H| ${
                open ? "rotate-45 -translate-y-2" : ""
              }   `}
            ></span>
          </button>
        </div>

        <div
          className={`flex    text-white duration-500 ease-in-out  flex-col lg:gap-5 gap-10 absolute lg:static  ${
            open
              ? "bg-color1 lg:bg-transparent top-0 left-0 pl-[3vmax] w-[180px] pt-[50px] items-start shadow-md    h-[100vh] "
              : "top-0  left-[-100%] h-[100vh] "
          } lg:h-[100%]  lg:flex-row lg:justify-between lg:items-center  lg:w-[60%] lg:shadow-none z-[999] 
             lg:-0`}
        >
          <Link
            href={"/"}
            className="text-md navlink  relative text-white hover:text-gray-200 duration-300 "
          >
            Home
          </Link>

          <Link
            href={"#about"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300"
            scroll={false}
          >
            About
          </Link>
          <Link
            href={"#skills"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300"
            scroll={false}
          >
            Skills
          </Link>
          <Link
            href={"#services"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300"
            scroll={false}
          >
            Services
          </Link>
          <Link
            href={"#projects"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300"
            scroll={false}
          >
            My Projects
          </Link>
          <Link
            href={"#contactme"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300"
            scroll={false}
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
