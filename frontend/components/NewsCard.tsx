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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                <Share2 className="w-4 h-4" />
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
                  <Badge
                    key={index}
                    text={source.name}
                    icon={source.icon || "https://upload.wikimedia.org/wikipedia/commons/c/c5/NDTV_logo.svg"}
                  />
                )
            )}
          </div>
          <button
            className="text-blue-600 bg-gray-200 text-sm font-medium hover:underline px-4 py-2 rounded-md cursor-pointer"
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
    <div className="inline-flex gap-1 px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium justify-center items-center">
      {/* <img src={icon} alt="" className="w-5 h-5 object-contain" /> */}
      <span className="text-xs">{text}</span>
    </div>
  );
};

export default NewsCard;
