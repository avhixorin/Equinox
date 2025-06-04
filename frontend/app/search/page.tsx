"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mobileNavLinks, navLinks, searchCategories } from "@/constants/constants";
import { Bell, Link, SearchIcon, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const path = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const router =  useRouter();
  const title = path.split("/").pop();
  return (
    <div className="min-h-screen bg-gray-50 max-sm:pb-16">
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
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 w-64 rounded-full border-gray-300"
                  autoFocus={path === "/search"}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  // onFocus={handleSearchFocus}
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
            <div className="md:hidden items-center">
              <h1 className="font-bold text-2xl">
                {title ? title.charAt(0).toUpperCase() + title.slice(1) : ""}
              </h1>
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
      <main className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-24 flex flex-col items-center justify-start">
        <div className="relative md:hidden w-full py-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 w-full pr-4 py-2 rounded-full border-gray-300"
            autoFocus={path === "/search"}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {searchCategories.map((category) => (
            <div
              key={category.name}
              onClick={() => setSearchValue(category.name)} //not working
              className="cursor-pointer rounded-3xl relative overflow-hidden shadow-md group h-64 transition-transform hover:scale-[1.02]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-300"
              />
              <div className="absolute inset-0 flex flex-col justify-end items-start p-6 z-10">
                <div className="text-white space-y-1">
                  <div className="mb-1">{category.icon}</div>
                  <span className="text-2xl font-semibold">
                    {category.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Search;
