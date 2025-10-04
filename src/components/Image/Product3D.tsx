import { motion } from "framer-motion";
import Image from "next/image";
const Image = ({ src, alt }) => {
  return (
    <motion.div
      className="w-[351px] h-[358px] flex items-center justify-center"
      whileHover={{
        rotateY: 15,
        rotateX: 5,
        scale: 1.05,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Image src={src} alt={alt} width={351} height={358} />
    </motion.div>
  );
};

export default Image;
