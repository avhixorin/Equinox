import { Home, Search, SquareChartGantt, User } from "lucide-react";

export const mobileNavLinks = [
  {
    name: "Home",
    activeIcon: <Home className="w-4 h-4" fill="#1a60fb" />,
    inActiveIcon: <Home className="w-4 h-4" />,
    href: "/",
  },
  {
    name: "Search",
    activeIcon: <Search className="w-4 h-4" fill="#1a60fb" />,
    inActiveIcon: <Search className="w-4 h-4" />,
    href: "/search",
  },
  {
    name: "Timeline",
    activeIcon: <SquareChartGantt className="w-4 h-4" fill="#1a60fb" />,
    inActiveIcon: <SquareChartGantt className="w-4 h-4" />,
    href: "/timeline",
  },
  {
    name: "Profile",
    activeIcon: <User className="w-4 h-4" fill="#1a60fb" />,
    inActiveIcon: <User className="w-4 h-4" />,
    href: "/profile",
  },
];

export const navLinks = [
  { name: "Home", icon: <Home className="w-4 h-4" />, href: "/" },
  { name: "Timeline", icon: <SquareChartGantt className="w-4 h-4" />, href: "/timeline" },
  {
    name: "Contact Us",
    icon: <Search className="w-4 h-4" />,
    href: "/contact",
  },
  { name: "About Us", icon: <User className="w-4 h-4" />, href: "/about" },
];

export const categories = [
  "All",
  "Sports",
  "Politics",
  "Health",
  "Science",
  "Technology",
  "Government",
  "Startup",
  "Business",
];
