import { Source } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";

const ArticleCard = ({
  articleId,
  source,
  time,
  image,
}: {
  articleId: string;
  source: Source;
  time: string;
  image: string;
}) => {
  const router = useRouter();
  return (
    <div
      className="bg-white flex rounded-md shadow-md overflow-hidden p-4 cursor-pointer"
      role="button"
      onClick={() => router.push(`${articleId}/article/${source.id}`)}
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
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <div className="w-[35%]">
        <img
          src={image || "/placeholder.png"}
          alt="Article Image"
          width={500}
          height={300}
          className="w-full h-28 rounded-md object-cover"
        />
      </div>
    </div>
  );
};

export default ArticleCard;
