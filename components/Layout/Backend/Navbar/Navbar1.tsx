"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef, MouseEvent } from "react";

import Logo1 from "@/public/rlogo1.png";

const navLinks = [
  {
    name: "home",
    link: "/",
  },
  {
    name: "about",
    link: "#about",
  },
  {
    name: "skills",
    link: "#skills",
  },
  {
    name: "services",
    link: "#services",
  },
  {
    name: "my work",
    link: "#projects",
  },
  {
    name: "contact",
    link: "#contact",
  },
];

const Navbar1: React.FC = () => {
  /* =======================================================================
       USESTATES AND REFS
   ======================================================================= */
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeNavLinkName, setActiveNavLinkName] = useState<null | string>(
    null
  );
  const [isSticky, setIsSticky] = useState(false);
  const mainNavBarRef = useRef<HTMLDivElement>(null);
  //==]

  /* =======================================================================
         SETTING ACTIVENAVLINK NAME
    ======================================================================= */
  const handlePanelClick = (name: string) => {
    setActiveNavLinkName((prevIndex) => (prevIndex === name ? null : name));
  };
  //==]

  /* =======================================================================
        TOGGLINING SIDEBAR
    ======================================================================= */
  const toggleSidebar = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
  };
  //==]

  /* =======================================================================
         MAKING NABAR STICKY
    ======================================================================= */
  useEffect(() => {
    if (!mainNavBarRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([event]) => setIsSticky(event.intersectionRatio < 1),
      { threshold: [1], rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(mainNavBarRef.current);

    return () => observer.disconnect();
  }, []);
  //==]

  return (
    <>
      <div className="p-2"></div>
      <nav
        ref={mainNavBarRef}
        className="z-[999] |||  min-w-full pt-4 ||| sticky top-[-2px] left-0 right-0  
        ||| select-none  text-gray-200 "
      >
        {/* MainNavbar */}
        <section id="Section" className={` text-gray-100  |||  px-4 ||| `}>
          <div
            className={` backdrop-filter backdrop-blur-sm px-4 mx-auto ||| flex justify-between items-stretch  
            |||  rounded-full bg-black/50 shadow-sm  shadow-white  |||  ${
              isSticky ? "sm:w-[99%]" : "md:w-[75%] lg:w-[85%]"
            }
             ||| duration-300 ease-in-out transition-all
            `}
          >
            {/* ======== LOGO =====*/}
            <Link
              href={"/"}
              className={`LogoContainer ||| flex justify-center items-center |||`}
            >
              <Image
                src={Logo1}
                alt="logo"
                width={200}
                height={200}
                className={`w-auto object-cover   ${
                  isSticky
                    ? "top-3 h-[36px] sm:h-[50px]"
                    : " h-[36px] sm:h-[55px]"
                } duration-300 ease-in-out transition-all`}
                placeholder="blur"
              />
            </Link>
            {/* ========  =====*/}
            {/* ======== HAM-BUTTOM =====*/}
            <button
              className="HAMBURGER-ICON-MD |||  lg:hidden ||| space-y-[6px] p-1 ||| flex flex-col justify-center items-center"
              onClick={toggleSidebar}
            >
              {" "}
              <span
                className={` block |||  h-0.5 w-6  bg-gray-300 |||    transition-all duration-300  ||| ${
                  isSidebarOpen ? "-rotate-45 translate-y-2" : ""
                } `}
              ></span>{" "}
              <span
                className={` block |||  h-0.5 w-6  bg-gray-300 |||   transition-all origin-right  duration-300    ||| ${
                  isSidebarOpen ? "w-[0px] bg-transparent" : ""
                }  `}
              ></span>{" "}
              <span
                className={` block |||| h-0.5 w-6  bg-gray-300 |||| transition-all duration-300  H| ${
                  isSidebarOpen ? "rotate-45 -translate-y-2" : ""
                }   `}
              ></span>{" "}
            </button>
            {/* ======== =====*/}
            {/* ======== HNAV-BAR =====*/}
            <div
              className={`hidden ${
                isSticky
                  ? "gap-[clamp(0.313rem,-2.261rem+4.248vw,1.622rem)]"
                  : "gap-[clamp(1px,-2.2rem+3.462vw,2rem)]"
              }
       ||| lg:flex  items-stretch  justify-evenly ||| duration-300  transform transition-all  `}
            >
              {navLinks.map((item, i) => (
                <div
                  className=" flex justify-center items-center  ||| px-4 "
                  key={i}
                >
                  <div className="relative  ||| ">
                    <Link
                      href={item.link}
                      className={`navlink ||| uppercase text-sm   duration-300 ease-in-out transition-all`}
                    >
                      {item.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {/* ========  =====*/}
          </div>
        </section>
        {/* ======== ========  */}
        {/* ======== VNAV-BAR=====*/}
        <section
          className={` z-[1000] ||| fixed  top-0  lg:hidden |||  overflow-y-auto ||| p-4 w-[220px] h-screen  |||
           bg-color1  text-white |||  transition-transform transform ${
             isSidebarOpen ? "-translate-x-[1px] left-0" : "-translate-x-full"
           } ease-in-out duration-300`}
        >
          <div className={`sidebarShell  w-full h-full flex flex-col  `}>
            {navLinks.map((item, i) => (
              <div
                className=" flex justify-center items-center  ||| px-4 mb-4 "
                key={i}
              >
                <div className="relative  ||| ">
                  <Link
                    href={item.link}
                    className={`navlink ||| uppercase text-sm   duration-300 ease-in-out transition-all`}
                  >
                    {item.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* ========><=====*/}
      </nav>
    </>
  );
};

export default Navbar1;
