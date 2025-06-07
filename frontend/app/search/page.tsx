"use client";
import GenreCard from "@/components/GenreCard";
import { Input } from "@/components/ui/input";
import { searchCategories } from "@/constants/constants";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
  const path = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && searchValue.trim() !== "") {
        router.push(`/search/${searchValue}`);
      }
    });
    return () => {
      window.removeEventListener("keydown", (e) => {
        if (e.key === "Enter" && searchValue.trim() !== "") {
          router.push(`/search/${searchValue}`);
        }
      });
    };
  });
  return (
    <div className="min-h-screen bg-gray-50 max-sm:pb-16">
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
            <GenreCard key={category.name} category={category} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Search;
