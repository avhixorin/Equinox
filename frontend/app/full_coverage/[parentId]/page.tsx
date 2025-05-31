"use client";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { RootState } from "@/redux/store";
import { article } from "@/types/types";
import {
  BookmarkIcon,
  MessageSquare
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FullCoverage = () => {
  const [loading, setLoading] = useState(true);
  const [viewingArticle, setViewingArticle] = useState<article | null>(null);
  const { fetchArticleById } = useFetch();
  const { parentId } = useParams();
  const articles = useSelector((state: RootState) => state.feed.feed);
  console.log("Articles in state:", articles);
  console.log("Parent ID:", parentId);
  useEffect(() => {
    const fetchData = async () => {
      if (typeof parentId === "string") {
        setLoading(true);
        const { articleById, loading } = await fetchArticleById(parentId);
        setLoading(loading);
        setViewingArticle(articleById);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);
  console.log("Viewing Article:", viewingArticle);
  return (
    <div className="min-h-screen">
      <div className="bg-white fixed bottom-0 max-sm:bottom-14 left-0 w-full z-40 flex justify-center items-center">
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

      <main className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {loading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
          </div>
        ) : (
          <div className=" w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="w-full flex justify-center items-center">
              <h1 className="text-xl text-center md:text-3xl font-medium">
                {viewingArticle?.title}
              </h1>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
              {viewingArticle?.sources.map((source, index) => (
                <div
                  key={index}
                  className="bg-white flex rounded-md shadow-md overflow-hidden p-4 cursor-pointer"
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
