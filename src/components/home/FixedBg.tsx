import homeImg4 from "../../assets/homeImg4.jpg";
import useDarkMode from "../../shared/hooks/useDarkMode";

function FixedBg() {
  const { darkMode } = useDarkMode();
  return (
    <>
      <div
        className={`h-75 bg-cover bg-fixed`}
        style={{ backgroundImage: `url(${homeImg4})` }}
      ></div>
      <div
        className={`${darkMode ? "bg-main-light" : "bg-main-dark"} px-4 py-20 text-center text-base text-white italic sm:text-lg md:text-2xl lg:text-3xl`}
      >
        <p>Crafting the perfect burger, delivered to your door.</p>
      </div>
    </>
  );
}

export default FixedBg;
