"use client";
import Image from "next/image";
import {
  Search,
  User,
  MessageCircle,
  Share,
  Bookmark,
  Home,
  Timer,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useInitialFeed } from "@/hooks/useFetch";
import { article } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function HomePage() {
  const navLinks = [
    { name: "Home", icon: <Home className="w-4 h-4" />, href: "#" },
    { name: "Search", icon: <Search className="w-4 h-4" />, href: "#" },
    { name: "Timeline", icon: <Timer className="w-4 h-4" />, href: "#" },
    { name: "Profile", icon: <User className="w-4 h-4" />, href: "/profile" },
  ];
  const categories = [
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
  const { loading } = useInitialFeed();
  const [filter, setFilter] = useState("All");
  const articles = useSelector((state: RootState) => state.feed.feed);

  const filteredArticles: article[] =
    filter === "All"
      ? articles
      : articles.filter((article: article) => article.category === filter);

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="md:hidden bg-white fixed bottom-0 left-0 w-full z-40 border-t">
        <div className="flex justify-around py-2">
          {navLinks.map((link) => (
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

      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 md:h-16">
            <div className="text-md md:text-2xl font-bold text-gray-800">
              <span className="text-gray-600">LOGO</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1"
              >
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Timeline
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About Us
              </a>
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

      <div className="mt-16 w-full">
        <div className="max-w-7xl flex justify-center mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 overflow-x-auto py-3 scrollbar-hidden">
            {categories.map((category) => (
              <button
                key={category}
                className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition ${
                  filter === category
                    ? "bg-blue-100 text-blue-700"
                    : "bg-white text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl h-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {loading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative p-2 rounded-md">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover brightness-45 rounded-md"
                  />
                  <div className="absolute inset-0 text-white flex flex-col justify-between p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white px-2 py-1 rounded text-sm font-medium">
                        {article.category}
                      </span>
                      <span className="text-white px-2 py-1 rounded text-sm">
                        {article.time}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold leading-tight">
                        {article.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <div
                          className="flex items-center space-x-1 text-sm cursor-pointer hover:text-gray-300"
                          role="button"
                          onClick={() => alert("Comments clicked!")}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{article.views}</span>
                        </div>
                        <div
                          className="flex items-center space-x-1 text-sm cursor-pointer hover:text-gray-300"
                          role="button"
                          onClick={() => alert("Share clicked!")}
                        >
                          <Share className="w-4 h-4" />
                          <span>{article.shares}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer hover:bg-transparent hover:text-gray-300"
                          onClick={() => alert("Bookmark added!")}
                        >
                          <Bookmark className="w-12 h-12 scale-120" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-col items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      {article.sources.map(
                        (source, index) =>
                          index < 3 && (
                            <span
                              key={index}
                              className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                            >
                              {source.name}
                            </span>
                          )
                      )}
                    </div>
                    <button
                      className="text-blue-600 bg-gray-200 text-sm font-medium hover:underline px-4 py-2 rounded-md cursor-pointer"
                      onClick={() =>
                        (window.location.href = `/full_coverage/${article.id}`)
                      }
                    >
                      📰 Full Coverage
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
