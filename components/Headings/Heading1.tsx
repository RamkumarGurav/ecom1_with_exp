"use client";
import {
  springAnimate70pxFromBelow,
  springAnimate70pxFromLeft,
} from "@/lib/frontend_lib/fm_variants/variants";
import { motion } from "framer-motion";

export default function PageName({
  first,
  second,
}: {
  first: string;
  second?: string;
}) {
  return (
    <div className="headingContainer mb-6">
      <motion.div
        className="text-2xl md:text-5xl text-start font-bold text-gray-100 mb-4"
        variants={springAnimate70pxFromBelow}
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{ once: true, amount: 0 }}
      >
        {first} &nbsp;
        {second && <span className="text-color1">{second}</span>}
      </motion.div>
      <motion.div
        variants={springAnimate70pxFromLeft}
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{ once: true, amount: 0 }}
        className="w-[120px] border-b-[3px] border-color1 mb-3"
      ></motion.div>
    </div>
  );
}
