import type { IconType } from "react-icons";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaCalendarAlt, FaTimesCircle, FaTruck } from "react-icons/fa";
import { FaImage, FaListUl } from "react-icons/fa6";
import { IoChevronDownCircle, IoGrid } from "react-icons/io5";
import { MdOutlineNewReleases } from "react-icons/md";

export const menuDetailData = [
  {
    id: "1",
    title: "Hamburger",

    description:
      "A classic favorite made with a juicy grilled beef patty, fresh lettuce, ripe tomatoes, and our signature house sauce, all served in a soft toasted bun.",
    price: 8.99,
  },
  {
    id: "2",
    title: "Bacon Burger",

    description:
      "Smoky crispy bacon layered over a perfectly grilled beef patty, topped with melted cheese and fresh veggies for a bold, savory bite.",
    price: 8.99,
  },
  {
    id: "3",
    title: "Cheese Burger",

    description:
      "A mouthwatering beef patty covered with rich, melted cheddar cheese, complemented by crisp lettuce and tangy pickles.",
    price: 8.99,
  },
  {
    id: "4",
    title: "German Burger",

    description:
      "Inspired by German flavors, featuring a grilled beef patty, caramelized onions, mustard sauce, and a hint of smoky sausage.",
    price: 8.99,
  },
  {
    id: "5",
    title: "Greek Burger",

    description:
      "A Mediterranean twist with a juicy beef patty, fresh tomatoes, creamy feta cheese, red onions, and tzatziki sauce.",
    price: 8.99,
  },
  {
    id: "6",
    title: "Onion Bacon Burger",

    description:
      "Crispy bacon and golden caramelized onions stacked over a tender beef patty, finished with melted cheese and our house sauce.",
    price: 8.99,
  },
];

export type dashboardMenuNavData = {
  id: number;
  title: string;
  icon: IconType;
  link?: string;
};

export const dashboardMenuNavData = [
  {
    id: 0,
    title: "Grid",
    icon: IoGrid,
  },
  {
    id: 1,
    title: "List",
    icon: FaListUl,
  },
  {
    id: 2,
    title: "Image",
    icon: FaImage,
  },
];

export const dashboardOrderNavData = [
  {
    id: 0,
    title: "New Orders",
    icon: MdOutlineNewReleases,
  },

  {
    id: 1,
    title: "Out for Delivery",
    icon: FaTruck,
  },
  {
    id: 2,
    title: "Delivered",
    icon: IoChevronDownCircle,
  },
  {
    id: 3,
    title: "Cancelled",
    icon: FaTimesCircle,
  },
  {
    id: 4,
    title: "Today's Orders",
    icon: BsFillCalendarDateFill,
  },
  {
    id: 5,
    title: "All Orders",
    icon: FaCalendarAlt,
  },
];

export const dashboardProductNavData = [
  {
    id: 0,
    title: "Grid",
    icon: IoGrid,
  },
  {
    id: 1,
    title: "List",
    icon: FaListUl,
  },
  {
    id: 2,
    title: "Card",
    icon: FaImage,
  },
];

export const dipsData = [
  {
    id: "1",
    title: "Ketchup",
    description:
      "A classic tomato-based sauce with a perfect balance of sweetness and tanginess, ideal for fries and burgers.",
    price: 1.49,
  },
  {
    id: "2",
    title: "Mayonnaise",
    description:
      "Creamy and smooth with a mild flavor, perfect for dipping fries or adding richness to sandwiches.",
    price: 1.49,
  },
  {
    id: "3",
    title: "BBQ Sauce",
    description:
      "Smoky and slightly sweet barbecue sauce with a rich flavor, great for grilled meats and fries.",
    price: 1.99,
  },
  {
    id: "4",
    title: "Garlic Sauce",
    description:
      "A bold and creamy garlic dip with a rich flavor, perfect for fries, burgers, and wraps.",
    price: 1.99,
  },
  {
    id: "5",
    title: "Cheese Sauce",
    description:
      "Warm and creamy melted cheese sauce, perfect for dipping fries or adding extra flavor to your meal.",
    price: 2.49,
  },
  {
    id: "6",
    title: "Sweet Chili Sauce",
    description:
      "A sweet and mildly spicy sauce with a hint of garlic, perfect for those who like a little kick.",
    price: 1.99,
  },
];
