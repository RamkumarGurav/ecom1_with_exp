"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";

interface Props {
  title: string;
  titleLink?: string;
  subLinks?: { name: string; link: string }[];
  isAccordian?: boolean;
  isOpen?: boolean;
  mainIcon?: React.ReactNode;
  subIcon?: React.ReactNode;
  pathName: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
export default function VNavAccordianItem5({
  title,
  titleLink = "",
  subLinks = [],
  isAccordian = false,
  isOpen,
  onClick,
  mainIcon,
  subIcon,
  pathName,
  children,
}: Props) {
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    const activeSubLink = subLinks.find((item) => pathName === item.link);
    setIsActive(activeSubLink ? activeSubLink.link : ""); // If activeSubLink is found, set its link, otherwise set to empty string
  }, [pathName, subLinks]);

  return (
    <div className="   w-full  select-none  ||| text-xgraynavtext text-base  ">
      {isAccordian ? (
        <>
          <div
            className={`group ||| accordianTitleContainer   ||| 
             w-full  ||| cursor-pointer  ||| p-2 px-4   mb-1 rounded 
             ||| relative flex justify-between items-center 

             
        
             
             ${
               isOpen
                 ? isActive !== ""
                   ? "bg-xblue text-xlight"
                   : "bg-xgrayhover text-xlight"
                 : ""
             }
             ${
               !isOpen
                 ? isActive !== ""
                   ? "bg-xblue text-xlight"
                   : "hover:bg-xgrayhover hover:text-xlight"
                 : ""
             }
               
              
               `}
            onClick={onClick}
          >
            <div
              className={`  |||   flex items-center  ||| font-semibold  select-none   font-sans    
              ||| `}
            >
              {mainIcon && <span className={`mr-2`}>{mainIcon}</span>}
              <span>{title}</span>
            </div>
            <FaAngleLeft
              size={20}
              className={`  ease-in-out transition-transform transform duration-500 group-hover:-rotate-90  ${
                isOpen ? "-rotate-90 text-inherit" : ""
              } `}
            />
          </div>
          <div
            className={`accordianItemContainer ||| relative |||   |||  overflow-hidden  w-full `}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100%" }}
                  exit={{ opacity: 0.5, height: 0 }}
                  transition={{ type: "tween", duration: 0.4 }}
                  className={` w-full |||   flex flex-col font-sans `}
                >
                  {subLinks.map((item: { [key: string]: any }, i: number) => {
                    return (
                      <Link
                        href={item.link}
                        className={` p-2 px-4
                        ${
                          isActive == item.link
                            ? "bg-xlight text-xgray"
                            : "hover:bg-xgrayhover hover:text-xlight"
                        }
                       mb-1 ||| group |||   font-sans  font-medium  select-none ||| flex items-center   
                    ||| border border-transparent rounded   |||
                      `}
                        key={i}
                      >
                        {subIcon && <span className={`mr-2`}>{subIcon}</span>}
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <Link
          href={titleLink}
          className={`block  |||   font-semibold  select-none   font-sans  
          ||| w-full p-2 mb-2 rounded |||  hover:bg-yellow-500 hover:text-gray-900 `}
        >
          {mainIcon && <span className={`mr-2`}>{mainIcon}</span>}
          <span>{title}</span>
        </Link>
      )}
    </div>
  );
}
