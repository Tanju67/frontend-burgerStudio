import homeImg2 from "../../assets/homeImg2.jpg";
import homeImg3 from "../../assets/homeImg3.jpg";

function AboutUs() {
  return (
    <div className="container-box space-y-16 py-12 sm:py-18 md:space-y-32 md:py-24">
      {/* First Section: Ingredients */}
      <div className="grid items-center gap-16 md:grid-cols-2">
        <div className="group relative">
          {/* Decorative Back Box */}
          <div className="bg-main/20 absolute -inset-4 -rotate-2 rounded-2xl transition-transform duration-500 group-hover:rotate-0" />
          <img
            src={homeImg2}
            alt="Fresh Ingredients"
            className="relative z-10 h-100 w-full rounded-xl object-cover shadow-2xl"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-main-btn text-4xl font-black tracking-tighter uppercase italic md:text-5xl">
            Quality in Every <br /> Single Bite
          </h2>
          <div className="bg-main h-1.5 w-20 rounded-full" />
          <p className="text-text-dark/80 text-lg leading-relaxed italic">
            "We believe that a great burger starts with the finest ingredients.
            That’s why we carefully select fresh, locally sourced products and
            prepare everything daily in our kitchen."
          </p>
          <p className="text-text-dark/60 leading-relaxed font-medium">
            From our soft, freshly baked buns to our premium beef and handmade
            sauces, every detail is crafted to deliver outstanding flavor.
          </p>
        </div>
      </div>

      {/* Second Section: Mission (Reversed) */}
      <div className="grid items-center gap-16 md:grid-cols-2">
        <div className="order-2 space-y-6 lg:order-1">
          <h2 className="text-main-btn text-4xl font-black tracking-tighter uppercase italic md:text-5xl">
            Fast. Fresh. <br /> Straight to You.
          </h2>
          <div className="bg-main h-1.5 w-20 rounded-full" />
          <p className="text-text-dark/80 text-lg leading-relaxed italic">
            Our mission is to make ordering your favorite burgers fast, easy,
            and enjoyable. Whether you are at home, at work, or with friends.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="bg-main-light flex-1 rounded-lg p-4 text-center">
              <span className="text-main-btn block text-2xl font-black">
                30min
              </span>
              <span className="text-main-dark/50 text-[10px] font-bold uppercase">
                Delivery
              </span>
            </div>
            <div className="bg-main-light flex-1 rounded-lg p-4 text-center">
              <span className="text-main-btn block text-2xl font-black">
                Hot
              </span>
              <span className="text-main-dark/50 text-[10px] font-bold uppercase">
                Bag System
              </span>
            </div>
          </div>
        </div>

        <div className="group relative order-1 lg:order-2">
          <div className="bg-main-btn/10 absolute -inset-4 rotate-2 rounded-2xl transition-transform duration-500 group-hover:rotate-0" />
          <img
            src={homeImg3}
            alt="Delivery Service"
            className="relative z-10 h-100 w-full rounded-xl object-cover shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
