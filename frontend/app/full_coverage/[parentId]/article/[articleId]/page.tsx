"use client";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { RootState } from "@/redux/store";
import { Source } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Article = () => {
  const [loading, setLoading] = useState(true);
  const [sourceArticle, setSourceArticle] = useState<Source | null>(null);
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
    <div className="min-h-screen">
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

      <main className="bg-white w-full h-full mx-auto px-4 sm:px-6 lg:px-8 max-sm:pt-14 pt-20 pb-8">
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
