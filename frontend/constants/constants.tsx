import {
  Bot,
  Building,
  Building2,
  CircleHelp,
  CircuitBoard,
  Clapperboard,
  Factory,
  Film,
  Home,
  Hospital,
  Landmark,
  Lock,
  LogOut,
  Moon,
  Search,
  SquareChartGantt,
  Trophy,
  User,
  Video,
} from "lucide-react";

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
  {
    name: "Timeline",
    icon: <SquareChartGantt className="w-4 h-4" />,
    href: "/timeline",
  },
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

export const searchCategories = [
  {
    name: "Sports",
    icon: <Trophy className="w-8 h-8" />,
    image:
      "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Entertainment",
    icon: <Film className="w-8 h-8" />,
    image:
      "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Media",
    icon: <Clapperboard className="w-8 h-8" />,
    image:
      "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Business",
    icon: <Factory className="w-8 h-8" />,
    image:
      "https://images.pexels.com/photos/7682352/pexels-photo-7682352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Celebrities",
    icon: <Video className="w-8 h-8" />,
    image:
      "https://images.pexels.com/photos/18824339/pexels-photo-18824339/free-photo-of-woman-in-a-red-tulle-dress.jpeg",
  },
  {
    name: "Technology",
    icon: <Bot className="w-8 h-8" />,
    image:
      "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Startup",
    icon: <Building2 className="w-8 h-8" />,
    image:
      "https://images.pexels.com/photos/3277808/pexels-photo-3277808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Politics",
    icon: <Building className="w-8 h-8" />,
    image:
      "https://images.pexels.com/photos/1464238/pexels-photo-1464238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Government",
    icon: <Landmark className="w-8 h-8" />,
    image:
      "https://images.pexels.com/photos/129112/pexels-photo-129112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Health",
    icon: <Hospital className="w-8 h-8" />,
    image:
      "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
  },
  {
    name: "Science",
    icon: <CircuitBoard className="w-8 h-8" />,
    image:
      "https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const SettingOptions = [
  {
    name: "Edit Profile",
    icon: <User className="w-4 h-4" />,
    href: "/settings/edit-profile",
  },
  {
    name: "Notifications",
    icon: <Clapperboard className="w-4 h-4" />,
    href: "/settings/notifications",
  },
  {
    name: "Security",
    icon: <Lock className="w-4 h-4" />,
    href: "/settings/change-password",
  },
  {
    name: "Help",
    icon: <CircleHelp className="w-4 h-4" />,
    href: "/settings/privacy",
  },
  {
    name: "Account Management",
    icon: <Trophy className="w-4 h-4" />,
    href: "/settings/account-management",
  },
  {
    name: "Dark Mode",
    icon: <Moon className="w-4 h-4" />,
    href: "/settings/help-support",
  },
  {
    name: "Logout",
    icon: <LogOut className="w-4 h-4" />,
    href: "/logout",
  }
]
