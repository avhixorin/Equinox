import { Home, Search, Timer, User } from "lucide-react";

export const mobileNavLinks = [
  { name: "Home", icon: <Home className="w-4 h-4" />, href: "/" },
  { name: "Search", icon: <Search className="w-4 h-4" />, href: "/search" },
  { name: "Timeline", icon: <Timer className="w-4 h-4" />, href: "/timeline" },
  { name: "Profile", icon: <User className="w-4 h-4" />, href: "/profile" },
];

export const navLinks = [
  { name: "Home", icon: <Home className="w-4 h-4" />, href: "/" },
  { name: "Timeline", icon: <Timer className="w-4 h-4" />, href: "/timeline" },
  { name: "Contact Us", icon: <Search className="w-4 h-4" />, href: "/contact" },
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
