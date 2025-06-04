"use client";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { RootState } from "@/redux/store";
import { addBookmark, removeBookmark } from "@/redux/userSlice";
import { article } from "@/types/types";
import { BookmarkIcon, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const FullCoverage = () => {
  const [loading, setLoading] = useState(true);
  const [viewingArticle, setViewingArticle] = useState<article | null>(null);
  const { fetchArticleById } = useFetch();
  const { parentId } = useParams();
  const dispatch = useDispatch();
  const userBookmarks = useSelector(
    (state: RootState) => state.user.user?.bookmarks
  );

  const bookmarkSet = useMemo(() => new Set(userBookmarks), [userBookmarks]);
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
  const handleBookmark = (articleId: string | undefined) => {
    if (!articleId) return;

    const isBookmarked = bookmarkSet.has(articleId);
    if (isBookmarked) {
      dispatch(removeBookmark(articleId));
    } else {
      dispatch(addBookmark(articleId));
    }
  };
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
            onClick={() => handleBookmark(viewingArticle?.id)}
          >
            <BookmarkIcon
              className={`w-8 h-8 scale-125 transition-colors ${
                viewingArticle?.id && bookmarkSet.has(viewingArticle.id)
                  ? "text-blue-600 fill-blue-600"
                  : "text-gray-600"
              }`}
            />
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
              {viewingArticle?.sources.map((source) => (
                <ArticleCard
                  key={source.id}
                  articleId={viewingArticle.id}
                  source={source}
                  time={viewingArticle.time}
                  image={viewingArticle.image}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FullCoverage;
