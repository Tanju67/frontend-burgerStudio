import homeImg from "../../assets/homeImg1.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Banner() {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0 z-10 bg-black/40" />

      <motion.img
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.25 }}
        transition={{
          repeat: Infinity,
          duration: 15,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="h-full w-full scale-105 object-cover object-center"
        src={homeImg}
        alt="Burger Studio Hero"
      />

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic drop-shadow-2xl md:text-7xl">
          Taste the <span className="text-main-btn">Studio</span> Magic
        </h2>
        <p className="mt-4 max-w-lg text-lg font-light text-white/90 italic md:text-xl">
          Handcrafted burgers made with passion and the finest local
          ingredients.
        </p>
        <Link
          to="/menu"
          className="bg-main-btn hover:bg-main-btn/90 mt-8 rounded-full px-10 py-4 font-black tracking-widest text-white uppercase italic shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          Explore Menu
        </Link>
      </div>
    </div>
  );
}

export default Banner;
