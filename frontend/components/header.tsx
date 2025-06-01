"use client";
import { Bell, Search, User } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { mobileNavLinks, navLinks } from "@/constants/constants";
import Link from "next/link";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const path = usePathname();
  const router = useRouter();

  const handleSearchFocus = () => {
    if (path !== "/search") {
      router.push("/search");
    }
  };

  return (
    <div>
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 md:h-16">
            <div className="text-md md:text-2xl font-bold text-gray-800">
              <span className="text-gray-600">LOGO</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = path === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`pb-1 font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <span className="ml-2">{link.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 w-64 rounded-full border-gray-300"
                  autoFocus={path === "/search"}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={handleSearchFocus}
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 cursor-pointer hover:text-gray-900"
                onClick={() => router.push("/profile")}
              >
                <User className="w-4 h-4 mr-2" /> Profile
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
          {mobileNavLinks.map((link) => {
            const isActive = path === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex flex-col items-center text-gray-600 hover:text-blue-600"
              >
                {isActive ? link.activeIcon : link.inActiveIcon}
                <span className={`${isActive ? "text-[#1a60fb]" : ""} text-xs`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
