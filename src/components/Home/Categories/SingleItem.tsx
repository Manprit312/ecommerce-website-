"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const SingleItem = ({ item }) => {
  return (
    <motion.div
      className=" cursor-pointer h-30 w-43  rounded-2xl shadow-lg 
                 flex flex-col items-center justify-start transition-all duration-300
                 hover:shadow-[0_10px_30px_rgba(236,73,114,0.3)] m-2"
      whileHover={{
        rotateY: 12,
        rotateX: -6,
        scale: 1.05,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Floating Product Image */}
      <motion.div
        className="w-20 h-30 "
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={item.img}
          alt={item.name}
          width={140}
          height={90}
          className="drop-shadow-lg object-contain"
        />
      </motion.div>

      {/* Title */}
      <h3 className="m-4 text-center text-sm font-semibold text-gray-800 group-hover:text-[#ec4972] transition-colors duration-300">
        {item.title}
      </h3>

      {/* Cherry Highlight Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-[#ec4972] to-[#ff758f] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    </motion.div>
  );
};

export default SingleItem;
