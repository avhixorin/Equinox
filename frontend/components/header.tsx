"use client";
import { Bell, Home, Search, Timer, User } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Header = () => {
  const mobileNavLinks = [
    { name: "Home", icon: <Home className="w-4 h-4" />, href: "#" },
    { name: "Search", icon: <Search className="w-4 h-4" />, href: "#" },
    { name: "Timeline", icon: <Timer className="w-4 h-4" />, href: "#" },
    { name: "Profile", icon: <User className="w-4 h-4" />, href: "/profile" },
  ];
  const navLinks = [
    { name: "Home", icon: <Home className="w-4 h-4" />, href: "#" },
    { name: "Timeline", icon: <Timer className="w-4 h-4" />, href: "#" },
    { name: "Contact Us", icon: <Search className="w-4 h-4" />, href: "#" },
    { name: "About Us", icon: <User className="w-4 h-4" />, href: "/profile" },
  ];
  return (
    <div>
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 md:h-16">
            <div className="text-md md:text-2xl font-bold text-gray-800">
              <span className="text-gray-600">LOGO</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 font-medium pb-1 "
                >
                  <span className="ml-2">{link.name}</span>
                </a>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 w-64 rounded-full border-gray-300"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 cursor-pointer hover:text-gray-900"
                onClick={() => (window.location.href = "/profile")}
              >
                <User className="w-4 h-4 mr-2 scale-120" /> Profile
              </Button>
            </div>
            <button className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      <div className="md:hidden bg-white fixed bottom-0 left-0 w-full z-40 border-t">
        <div className="flex justify-around py-2">
          {mobileNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex flex-col items-center text-gray-600 hover:text-blue-600"
            >
              {link.icon}
              <span className="text-xs">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
