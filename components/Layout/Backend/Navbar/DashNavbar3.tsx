"use client";
import { MdAccountCircle } from "react-icons/md";
import { IoLogoVercel } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { SiPreact } from "react-icons/si";
import { IoLogoWebComponent } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";
import { AiFillProfile } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { SiOnlyoffice } from "react-icons/si";
import { MdLogout } from "react-icons/md";
import React, { useState, useEffect, useRef, MouseEvent } from "react";
import VNavAccordianItem5 from "./VNavAccordianItem5";
import { motion } from "framer-motion";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FooterBottom from "../Footer/FooterBottom";
import LogoutButton from "@/components/Buttons/LogoutButton";
import { Button } from "@/components/ui/button";
import StoreProvider from "@/lib/redux-store/StoreProvider";

export default function DashNavbar3({
  userData,
  projectsRes,
  skillsRes,
  applicationsRes,
  children,
}: {
  userData: any;
  projectsRes?: any;
  skillsRes?: any;
  applicationsRes?: any;
  children: React.ReactNode;
}) {
  let navLinks = {
    dashboard: {
      name: "Dashboard",
      dropDown: [
        {
          name: "Dashboard",
          link: "/secure-region/dashboard",
        },
      ],
    },
    bio: {
      name: "Bio",
      dropDown: [
        {
          name: "Skills",
          link: "/secure-region/dashboard/skills",
        },
        {
          name: "Projects",
          link: "/secure-region/dashboard/projects",
        },
      ],
    },
    jobs: {
      name: "Jobs",
      dropDown: [
        {
          name: "Applications",
          link: "/secure-region/dashboard/job-applications",
        },
      ],
    },
  };
  const pathName = usePathname();
  // customLogger(projects);

  /* =======================================================================
       USESTATES AND REFS
   ======================================================================= */
  const [user, setUser] = useState<any>(userData);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeNavLinkName, setActiveNavLinkName] = useState<null | string>(
    null
  );
  const [isSticky, setIsSticky] = useState(false);
  const mainNavBarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
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
  // useEffect(() => {
  //   setUser({ name: "Ramkumar", email: "ramkumar@gmail" });
  // }, []);
  //==]

  const doLogout = async () => {
    const res = await fetch("/api/v1/auth/logout");

    return await res.json();
  };
  const handleLogout = async () => {
    setIsLogoutLoading(true);
    // setUser(null);
    await doLogout();
    setUser(null);
    setIsLogoutLoading(false);
    router.push("/auth/login");
  };

  return (
    <StoreProvider>
      <div
        className={`DASH_LAYOUT  |||  flex  items-stretch  ||| text-white w-full  || relative z-[1] `}
      >
        <motion.div
          initial={{ opacity: 1, minWidth: "250px" }}
          animate={{ opacity: 1, minWidth: isSidebarOpen ? "250px" : "0" }}
          exit={{ opacity: 0.5, minWidth: 0 }}
          transition={{ type: "tween", duration: 0.4 }}
          style={{ backgroundColor: "black" }}
          className={`DASH_LAYOUT_RIGHT  |||  relative z-[1]  |||     text-xlight    `}
        >
          <motion.div
            initial={{ opacity: 1, minWidth: "250px" }}
            animate={{ opacity: 1, x: !isSidebarOpen ? "-300px" : "0" }}
            exit={{ opacity: 0.5, x: 0 }}
            transition={{ type: "tween", duration: 0.4 }}
            className={` z-[1]  ||| fixed  top-0   ||| overflow-y-auto no-scrollbar |||  w-[250px]     ||| ${
              !isSidebarOpen && "hidden"
            }  `}
          >
            <div
              className={`flex flex-col justify-between  || min-h-screen  || bg-black`}
            >
              <div className="SIDE_TOP">
                <div
                  className=" min-h-[57px] p-1  ||| sticky top-0  z-[2]  |||   
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
                  <p>{user && user.name}</p>
                </div>
                <div
                  className={`SIDEBAR_MENU_CONT  |||  p-4 px-2 |||  w-full  `}
                >
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
                    mainIcon={<SiOnlyoffice size={20} />}
                    subIcon={<FaRegCircle />}
                    isAccordian={true}
                    title={navLinks.jobs.name}
                    subLinks={navLinks.jobs.dropDown}
                    onClick={() => handlePanelClick(navLinks.jobs.name)}
                    isOpen={activeNavLinkName === navLinks.jobs.name}
                    pathName={pathName}
                  />
                </div>
              </div>
              <div className={`SIDE_BOTTOM  || w-full p-4`}>
                {user ? (
                  <LogoutButton
                    className={`bg-purple-700 hover:bg-purple-800 w-full`}
                  >
                    Logout
                  </LogoutButton>
                ) : (
                  <Link href="/login">
                    <Button
                      className={`bg-purple-700 hover:bg-purple-800 w-full`}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
        <section className="DASH_LAYOUT_LEFT  || w-full text-black  ||  relative z-[1]">
          <div className="flex p-4 border ">helow</div>
          <main>{children}</main>
        </section>
        {/* <div
          className={`DASH_LAYOUT_LEFT  ||| relative z-[10] |||  bg-xgraywhite  |||  min-h-[100vh]  |||  flex flex-col grow
        `}
        >
          <nav
            className={`bg-[#fff] w-full text-gray-900   
          ||| shadow   |||  sticky top-0 right-0  `}
          >
            <div
              className={`min-h-[57px] px-4 py-0 w-full   ||| flex justify-between items-stretch `}
            >
              <div className="NAV_RIGHT flex items-center gap-8">
                <FiMenu
                  size={20}
                  onClick={toggleSidebar}
                  className={`cursor-pointer`}
                />
                <Link href="/admin/dashboard">Home</Link>
                <Link href="/admin/dashboard">Contact</Link>
                {user ? (
                  <LogoutButton>Logout</LogoutButton>
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
        </div> */}
      </div>
    </StoreProvider>
  );
}
