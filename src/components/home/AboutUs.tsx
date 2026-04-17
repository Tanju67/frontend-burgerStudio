import homeImg2 from "../../assets/homeImg2.jpg";
import homeImg3 from "../../assets/homeImg3.jpg";

function AboutUs() {
  return (
    <div className="container-box py-16 text-sm md:text-base">
      <h1 className="responsive-heading text-main-btn uppercase">
        About Burger Studio
      </h1>
      <div className="bg-main-light mt-20 grid items-center gap-4 lg:mt-30 lg:grid-cols-2">
        <div className="relative h-45 w-[90%] md:h-75">
          <img
            src={homeImg2}
            alt="img"
            className="absolute -top-8 right-0 bottom-50 left-[5%] h-60 w-full object-cover shadow-xl md:h-90"
          />
        </div>

        <div className="p-6 md:p-8 lg:px-10">
          <p>
            We believe that a great burger starts with the finest ingredients.
            That’s why we carefully select fresh, locally sourced products and
            prepare everything daily in our kitchen. From our soft, freshly
            baked buns to our premium beef and handmade sauces, every detail is
            crafted to deliver outstanding flavor. Our chefs combine traditional
            techniques with modern creativity to create burgers that are both
            classic and innovative. With every order, we aim to provide a
            delicious, satisfying, and memorable experience. Whether you crave a
            simple cheeseburger or a bold signature creation, we promise
            quality, freshness, and taste in every single bite.
          </p>
        </div>
      </div>
      <div className="bg-main-light mt-20 grid items-center gap-4 lg:mt-36 lg:grid-cols-2">
        <div className="order-3 p-6 md:p-8 lg:order-0 lg:px-10">
          <p>
            Our mission is to make ordering your favorite burgers fast, easy,
            and enjoyable. With our modern online platform, you can browse the
            menu, customize your meal, and place your order in just a few
            clicks. We focus on quick preparation and reliable delivery, so your
            food arrives hot, fresh, and perfectly packed. Whether you are at
            home, at work, or with friends, we bring restaurant-quality burgers
            straight to your door. Convenience, speed, and customer satisfaction
            are at the heart of everything we do, ensuring a smooth and
            enjoyable ordering experience every time.
          </p>
        </div>
        <div className="relative h-45 w-[90%] md:h-75">
          <img
            src={homeImg3}
            alt="img"
            className="absolute -top-8 right-0 bottom-50 left-[5%] h-60 w-full object-cover shadow-xl md:h-90"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
