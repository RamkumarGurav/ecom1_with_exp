"use client";
import { MdAccountCircle } from "react-icons/md";
import { IoLogoVercel } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { SiPreact } from "react-icons/si";
import { IoLogoWebComponent } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";
import { AiFillProfile } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import React, { useState, useEffect, useRef, MouseEvent } from "react";
import VNavAccordianItem5 from "./VNavAccordianItem5";
import { motion } from "framer-motion";

import { usePathname } from "next/navigation";
import Link from "next/link";
import FooterBottom from "../../Backend/Footer/FooterBottom";
import LogoutButton from "@/components/Buttons/LogoutButton";
import { Button } from "@/components/ui/button";
let navLinks = {
  dashboard: {
    name: "Dashboard",
    dropDown: [
      {
        name: "Dashboard",
        link: "/admin/dashboard",
      },
    ],
  },
  bio: {
    name: "Bio",
    dropDown: [
      {
        name: "Skills",
        link: "/admin/skills",
      },
      {
        name: "Projects",
        link: "/admin/projects",
      },
    ],
  },
};

export default function DashNavbar3({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  /* =======================================================================
       USESTATES AND REFS
   ======================================================================= */
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
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
  const toggleSidebar = (e: any) => {
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

  /* =======================================================================
         SIDEBAR CLOSES AFTER CLICKING OUTSIDE OF SIDEBAR
    ======================================================================= */
  // Function to handle clicks outside the sidebar
  const handleOutsideClick = (e: any) => {
    // Get sidebar and hamburger button elements by their IDs
    const sidebar = document.getElementById("sidebar");
    const hamBtn = document.getElementById("hamBtn");

    // Check if sidebar and hamburger button elements exist, and if the clicked target is outside them
    if (
      sidebar &&
      hamBtn &&
      !sidebar.contains(e.target as Node) && // Check if the clicked target is not inside the sidebar
      !hamBtn.contains(e.target as Node) // Check if the clicked target is not the hamburger button
    ) {
      // If the clicked target is outside both the sidebar and the hamburger button, close the sidebar
      setIsSidebarOpen(false); // Set the state to close the sidebar
    }
  };

  // Effect hook to add and remove click event listener for handling clicks outside the sidebar
  useEffect(() => {
    // Add click event listener to the entire document, to handle clicks anywhere on the page
    document.addEventListener("click", handleOutsideClick);
    // Clean up function to remove the click event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleOutsideClick); // Remove the click event listener
    };
  }, []); // Empty dependency array means this effect will run only once, after the component is mounted
  //==]

  /* =======================================================================
         SETTING USER
    ======================================================================= */
  useEffect(() => {
    setUser({ name: "Ramkumar", email: "ramkumar@gmail" });
  }, []);
  //==]

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div
      className={`DASH_LAYOUT  |||  flex  items-stretch  |||     w-full  ||| bg-xgraydark `}
    >
      <motion.div
        initial={{ opacity: 1, minWidth: "250px" }}
        animate={{ opacity: 1, minWidth: isSidebarOpen ? "250px" : "0" }}
        exit={{ opacity: 0.5, minWidth: 0 }}
        transition={{ type: "tween", duration: 0.4 }}
        style={{ backgroundColor: "black" }}
        className={`DASH_LAYOUT_RIGHT  |||  relative z-[1]  |||   ||| min-h-full   text-xlight 
        !bg-xgraydark   `}
      >
        <motion.div
          initial={{ opacity: 1, minWidth: "250px" }}
          animate={{ opacity: 1, x: !isSidebarOpen ? "-300px" : "0" }}
          exit={{ opacity: 0.5, x: 0 }}
          transition={{ type: "tween", duration: 0.4 }}
          className={` z-[1]  ||| fixed  top-0   ||| overflow-y-auto no-scrollbar |||  w-[250px] h-screen  |||
          bg-xgraydark    ||| ${!isSidebarOpen && "hidden"}  `}
        >
          <div
            className=" min-h-[57px] p-1  ||| sticky top-0  z-[2]  ||| bg-xgraydark   
          "
          >
            <div
              className={`p-4 py-1||| flex items-center gap-2 
          ||| bg-purple-700 rounded-xl  border-b border-b-gray-700
           ||| font-semibold`}
            >
              <IoLogoWebComponent size={35} />
              <p>PORTFOLIO </p>
            </div>
          </div>
          <div className="p-4  ||| flex items-center gap-2  |||  border-b border-b-gray-700">
            <MdAccountCircle size={35} />
            <p>Ramkumar</p>
          </div>
          <div className={`SIDEBAR_MENU_CONT  |||  p-4 px-2 |||  w-full  `}>
            <VNavAccordianItem5
              mainIcon={<RiDashboard3Fill size={20} />}
              subIcon={<FaRegCircle />}
              isAccordian={true}
              title={navLinks.dashboard.name}
              subLinks={navLinks.dashboard.dropDown}
              onClick={() => handlePanelClick(navLinks.dashboard.name)}
              isOpen={activeNavLinkName === navLinks.dashboard.name}
              pathName={pathName}
            />
            <VNavAccordianItem5
              mainIcon={<AiFillProfile size={20} />}
              subIcon={<FaRegCircle />}
              isAccordian={true}
              title={navLinks.bio.name}
              subLinks={navLinks.bio.dropDown}
              onClick={() => handlePanelClick(navLinks.bio.name)}
              isOpen={activeNavLinkName === navLinks.bio.name}
              pathName={pathName}
            />
            <VNavAccordianItem5
              mainIcon={<AiFillProfile size={20} />}
              subIcon={<FaRegCircle />}
              isAccordian={true}
              title={navLinks.bio.name}
              subLinks={navLinks.bio.dropDown}
              onClick={() => handlePanelClick(navLinks.bio.name)}
              isOpen={activeNavLinkName === navLinks.bio.name}
              pathName={pathName}
            />
            <VNavAccordianItem5
              mainIcon={<AiFillProfile size={20} />}
              subIcon={<FaRegCircle />}
              isAccordian={true}
              title={navLinks.bio.name}
              subLinks={navLinks.bio.dropDown}
              onClick={() => handlePanelClick(navLinks.bio.name)}
              isOpen={activeNavLinkName === navLinks.bio.name}
              pathName={pathName}
            />
            <VNavAccordianItem5
              mainIcon={<AiFillProfile size={20} />}
              subIcon={<FaRegCircle />}
              isAccordian={true}
              title={navLinks.bio.name}
              subLinks={navLinks.bio.dropDown}
              onClick={() => handlePanelClick(navLinks.bio.name)}
              isOpen={activeNavLinkName === navLinks.bio.name}
              pathName={pathName}
            />
            <VNavAccordianItem5
              mainIcon={<AiFillProfile size={20} />}
              subIcon={<FaRegCircle />}
              isAccordian={true}
              title={navLinks.bio.name}
              subLinks={navLinks.bio.dropDown}
              onClick={() => handlePanelClick(navLinks.bio.name)}
              isOpen={activeNavLinkName === navLinks.bio.name}
              pathName={pathName}
            />
            <VNavAccordianItem5
              mainIcon={<AiFillProfile size={20} />}
              subIcon={<FaRegCircle />}
              isAccordian={true}
              title={navLinks.bio.name}
              subLinks={navLinks.bio.dropDown}
              onClick={() => handlePanelClick(navLinks.bio.name)}
              isOpen={activeNavLinkName === navLinks.bio.name}
              pathName={pathName}
            />
            <VNavAccordianItem5
              mainIcon={<AiFillProfile size={20} />}
              subIcon={<FaRegCircle />}
              isAccordian={true}
              title={navLinks.bio.name}
              subLinks={navLinks.bio.dropDown}
              onClick={() => handlePanelClick(navLinks.bio.name)}
              isOpen={activeNavLinkName === navLinks.bio.name}
              pathName={pathName}
            />
          </div>
        </motion.div>
      </motion.div>
      <div
        className={`DASH_LAYOUT_LEFT  ||| relattive  |||  bg-xgraywhite  |||  min-h-[100vh]  |||  flex flex-col grow
        `}
      >
        <nav
          className={`bg-[#fff] w-full text-gray-900   
          ||| shadow   |||  sticky top-0  `}
        >
          <div
            className={`min-h-[57px] px-4 py-0 w-full   ||| flex justify-between items-stretch `}
          >
            <div className="NAV_RIGHT flex items-center gap-8">
              {/* ======== HAM-BUTTOM =====*/}
              <FiMenu
                size={20}
                onClick={toggleSidebar}
                className={`cursor-pointer`}
              />
              <Link href="/admin/dashboard">Home</Link>
              <Link href="/admin/dashboard">Contact</Link>
              {user ? (
                <LogoutButton />
              ) : (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </div>
            <div className="NAV_LEFT flex items-center gap-4">Hi!</div>
          </div>
        </nav>
        <main className={`p-1 sm:p-4`}>{children}</main>
        <footer className={` min-w-full  mt-auto`}>
          <FooterBottom />
        </footer>
      </div>
    </div>
  );
}
