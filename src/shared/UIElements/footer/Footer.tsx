import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-bg border-main-btn text-text-dark border-t-4">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <h2 className="text-main-btn text-2xl font-black tracking-tighter uppercase italic">
              Burger <span className="text-main-dark">Studio</span>
            </h2>
            <p className="text-text-dark/70 text-sm leading-relaxed">
              Crafting the finest American cuisine and delivering it straight to
              your door. Taste the difference of quality ingredients.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaTwitter />} />
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h2 className="text-main-btn mb-6 text-sm font-black tracking-widest uppercase italic">
              Contact
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-main-btn mt-1" />
                <span>
                  42 Baker Street, London,
                  <br /> NW1 6XE, United Kingdom
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MdPhone className="text-main-btn" size={18} />
                <span>+44 20 7946 0958</span>
              </li>
              <li className="flex items-center gap-3">
                <MdEmail className="text-main-btn" size={18} />
                <span>hello@burgerstudio.co.uk</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Delivery Areas (SEO Friendly) */}
          <div>
            <h2 className="text-main-btn mb-6 text-sm font-black tracking-widest uppercase italic">
              Delivery Areas
            </h2>
            <ul className="text-text-dark/60 grid grid-cols-2 gap-2 text-xs font-bold tracking-tighter uppercase">
              <li className="hover:text-main-btn cursor-default transition-colors">
                • London
              </li>
              <li className="hover:text-main-btn cursor-default transition-colors">
                • Croydon
              </li>
              <li className="hover:text-main-btn cursor-default transition-colors">
                • Kingston
              </li>
              <li className="hover:text-main-btn cursor-default transition-colors">
                • Richmond
              </li>
              <li className="hover:text-main-btn cursor-default transition-colors">
                • Wimbledon
              </li>
              <li className="hover:text-main-btn cursor-default transition-colors">
                • Ealing
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter or Mission */}
          <div>
            <h2 className="text-main-btn mb-6 text-sm font-black tracking-widest uppercase italic">
              Our Promise
            </h2>
            <p className="text-text-dark/70 text-sm leading-relaxed italic">
              "Quality is our top priority. We don’t cut corners. Fast,
              delicious, and crafted with care — that’s our promise to every
              burger lover."
            </p>
            <div className="bg-main mt-4 h-1 w-12" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-main-btn py-6">
        <div className="container-box flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-center text-xs font-medium text-white/80 md:text-left">
            &copy; 2026 Burger Studio. All rights reserved. Created for
            educational purposes.
          </p>
          <div className="flex gap-6 text-[10px] font-bold tracking-widest text-white/60 uppercase">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="bg-main-light text-main-btn hover:bg-main-btn flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-all duration-300 hover:text-white"
    >
      {icon}
    </a>
  );
}

export default Footer;
