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
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { article } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function HomePage() {
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
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const { fetchInitialFeed } = useFetch();
  const articles = useSelector((state: RootState) => state.feed.feed);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { loading } = await fetchInitialFeed();
      setLoading(loading);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading]);

  const filteredArticles: article[] =
    filter === "All"
      ? articles
      : articles.filter((article: article) => article.category === filter);

  return (
    <div className="min-h-screen bg-white pb-16">

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
