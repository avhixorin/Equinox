import { article } from "@/types/types";
import { Bookmark, MessageCircle, Share2 } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type newsCard = {
  article: article;
};

const NewsCard: React.FC<newsCard> = ({ article }) => {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
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
            <span className="bg-black/40 px-2 py-1 rounded text-sm font-medium">
              {article.category}
            </span>
            <span className="bg-black/40 px-2 py-1 rounded text-sm">
              {article.time}
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold leading-tight">{article.title}</h3>
            <div className="flex items-center space-x-4 mt-2">
              <div
                className="flex items-center space-x-1 text-sm cursor-pointer hover:text-gray-300"
                onClick={() => alert("Comments clicked!")}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{article.views}</span>
              </div>
              <div
                className="flex items-center space-x-1 text-sm cursor-pointer hover:text-gray-300"
                onClick={() => alert("Share clicked!")}
              >
                <Share2 className="w-4 h-4" />
                <span>{article.shares}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-300 p-0"
                onClick={() => alert("Bookmark added!")}
              >
                <Bookmark className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center justify-between gap-4">
          <div className="flex items-center space-x-2 flex-wrap">
            {article.sources.slice(0, 3).map((source, index) => (
              <Badge
                key={index}
                text={source.name}
                icon={source.icon || "https://upload.wikimedia.org/wikipedia/commons/c/c5/NDTV_logo.svg"}
              />
            ))}
          </div>
          <button
            className="text-blue-600 dark:text-blue-400 bg-gray-200 dark:bg-zinc-700 hover:underline px-4 py-2 rounded-md text-sm font-medium"
            onClick={() => router.push(`/full_coverage/${article.id}`)}
          >
            📰 Full Coverage
          </button>
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{ text: string; icon: string }> = ({ text, icon }) => {
  return (
    <div className="inline-flex gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs font-medium items-center">
      {/* <img src={icon} alt="" className="w-5 h-5 object-contain" /> */}
      <span>{text}</span>
    </div>
  );
};

export default NewsCard;
