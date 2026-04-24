import MainNav from "../../shared/UIElements/Navigation/MainNav";
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import FixedBg from "./FixedBg";

function Home() {
  return (
    <main className="text-text-dark bg-bg -mt-2">
      <MainNav title={false} />
      <Banner />
      <AboutUs />
      <FixedBg />
    </main>
  );
}

export default Home;
