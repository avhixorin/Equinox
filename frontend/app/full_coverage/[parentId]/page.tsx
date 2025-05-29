"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInitialFeed } from "@/hooks/useFetch";
import { RootState } from "@/redux/store";
import {
  ArrowLeft,
  Bell,
  BookmarkIcon,
  Home,
  MessageSquare,
  Search,
  Timer,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const FullCoverage = () => {
  const navLinks = [
    { name: "Home", icon: <Home className="w-4 h-4" />, href: "#" },
    { name: "Search", icon: <Search className="w-4 h-4" />, href: "#" },
    { name: "Timeline", icon: <Timer className="w-4 h-4" />, href: "#" },
    { name: "Profile", icon: <User className="w-4 h-4" />, href: "/profile" },
  ];
  const { loading } = useInitialFeed();

  const articles = useSelector((state: RootState) => state.feed.feed);
  console.log("Articles in state:", articles);
  const { parentId } = useParams();
  console.log("Parent ID:", parentId);
  const viewingArticle = articles.find((article) => article.id === parentId);
  console.log("Viewing Article:", viewingArticle);
  return (
    <div className="min-h-screen pb-16">
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
      <div className="bg-white fixed bottom-6 max-sm:bottom-14 left-0 w-full z-40 flex justify-center items-center">
        <div className="flex justify-evenly items-center py-2 w-full md:w-1/4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 cursor-pointer hover:text-gray-900"
            onClick={() => (window.location.href = "#")}
          >
            <MessageSquare className="w-8 h-8 scale-125 mr-2" />{" "}
            {viewingArticle?.views}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 cursor-pointer hover:text-gray-900"
            onClick={() => (window.location.href = "/search")}
          >
            <BookmarkIcon className="w-8 h-8 scale-125" />
          </Button>
        </div>
      </div>
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 md:h-16">
            <div className="hidden md:block text-md md:text-2xl font-bold text-gray-800">
              <span className="text-gray-600">LOGO</span>
            </div>
            <div className="md:hidden text-md md:text-2xl font-bold text-gray-800">
              <button onClick={() => window.history.back()}>
                <ArrowLeft className="w-6 h-6" />
              </button>
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

      <main className="bg-white max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {loading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="w-full flex justify-center items-center">
              <h1 className="text-xl text-center md:text-3xl font-medium">
                {viewingArticle?.title}
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {viewingArticle?.sources.map((source, index) => (
                <div
                  key={index}
                  className="flex rounded-md shadow-md overflow-hidden p-4 cursor-pointer"
                  role="button"
                  onClick={() =>
                    (window.location.href = `${viewingArticle.id}/article/${source.id}`)
                  }
                >
                  <div className="bg-white flex flex-col justify-between items-start w-[65%]">
                    <img
                      src={source?.icon || "/placeholder.png"}
                      alt={source?.name}
                      width={500}
                      height={300}
                      className="w-16 h-4 rounded-md object-cover"
                    />
                    <h3>{source?.newsHeadline || "No Title Available"}</h3>
                    <p className="text-xs text-gray-500">
                      {viewingArticle?.time}
                    </p>
                  </div>
                  <div className="w-[35%]">
                    <img
                      src={viewingArticle?.image || "/placeholder.png"}
                      alt="Article Image"
                      width={500}
                      height={300}
                      className="w-full h-28 rounded-md object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FullCoverage;
