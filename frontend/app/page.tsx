"use client";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { article } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { categories } from "@/constants/constants";
import NewsCard from "@/components/NewsCard";

export default function HomePage() {
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
              //Reusable NewsCard component
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
