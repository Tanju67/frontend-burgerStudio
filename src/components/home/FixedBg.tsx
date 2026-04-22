import homeImg4 from "../../assets/homeImg4.jpg";
import useDarkMode from "../../shared/hooks/useDarkMode";

function FixedBg() {
  const { darkMode } = useDarkMode();

  return (
    <section>
      {/* Parallax Background */}
      <div
        className="relative flex h-[50vh] items-center justify-center bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${homeImg4})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-4 border-2 border-white/30 p-8 backdrop-blur-sm md:p-12">
          <h3 className="text-center text-3xl font-black tracking-tighter text-white uppercase italic md:text-5xl">
            Join the Studio <br /> Experience
          </h3>
        </div>
      </div>

      {/* Quote Banner */}
      <div
        className={`${
          darkMode ? "bg-main-dark text-white" : "bg-main text-main-dark"
        } px-4 py-24 text-center transition-colors duration-500`}
      >
        <div className="container-box max-w-4xl">
          <p className="text-2xl leading-tight font-black tracking-tighter uppercase italic md:text-4xl">
            "Crafting the perfect burger, <br /> delivered to your door."
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-main-btn text-4xl">
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FixedBg;
