import homeImg from "../../assets/homeImg1.jpg";

function Banner() {
  return (
    <div className="h-[60vh] overflow-hidden">
      <img
        className="h-full w-full object-cover object-[50%_60%]"
        src={homeImg}
        alt="img"
      />
    </div>
  );
}

export default Banner;
