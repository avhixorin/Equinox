"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import { RootState } from "@/redux/store";
import { Source } from "@/types/types";
import { ArrowLeft, Bell, Home, Search, Timer, User } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Article = () => {
  const [loading, setLoading] = useState(true);
  const [sourceArticle, setSourceArticle] = useState<Source | null>(null);
  const navLinks = [
    { name: "Home", icon: <Home className="w-4 h-4" />, href: "#" },
    { name: "Search", icon: <Search className="w-4 h-4" />, href: "#" },
    { name: "Timeline", icon: <Timer className="w-4 h-4" />, href: "#" },
    { name: "Profile", icon: <User className="w-4 h-4" />, href: "/profile" },
  ];
  const { fetchSourceById } = useFetch();
  const { parentId, articleId } = useParams();
  console.log("Parent ID:", parentId);
  console.log("Article ID:", articleId);
  useEffect(() => {
    const fetchData = async () => {
      if (typeof parentId === "string") {
        setLoading(true);
        const { sourceById, loading } = await fetchSourceById(
          parentId as string, articleId as string
        );
        setLoading(loading);
        setSourceArticle(sourceById);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);
  const articles = useSelector((state: RootState) => state.feed.feed);
  const viewingArticle = articles.find((article) => article.id === parentId);
  console.log("Viewing Article:", viewingArticle);
  console.log("Source Article:", sourceArticle);
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
      <div className="bg-white fixed bottom-0 max-sm:bottom-14 left-0 w-full z-40 flex justify-center items-center">
        <div className="flex justify-evenly items-center py-2 w-full overflow-x-auto">
          {viewingArticle?.sources.map((source) => (
            <Button
              key={source.id}
              variant="ghost"
              size="sm"
              className="text-gray-600 cursor-pointer hover:text-gray-900 hover:bg-transparent"
              onClick={() => (window.location.href = `${source.id}`)}
            >
              <img src={source?.icon} alt="" className="w-10 h-8" />
            </Button>
          ))}
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
            <div className="md:hidden text-md md:text-2xl font-bold text-gray-800">
              <img src={sourceArticle?.icon} alt="" className="w-32 h-8" />
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

      <main className="bg-white max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 max-sm:pt-14 pt-20 pb-8">
        {loading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="w-full flex justify-center items-center">
              <img src={viewingArticle?.image} alt="" className="rounded-md" />
            </div>
            <div className="w-full py-4">
              <h2 className="text-xl md:text-3xl font-semibold text-gray-500 text-left italic">
                {sourceArticle?.shortDescription}
              </h2>
            </div>
            <div className="w-full">
              <p className="text-xl md:text-2xl text-left">
                {sourceArticle?.content}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Article;
