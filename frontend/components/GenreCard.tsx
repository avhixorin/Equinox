import { Category } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";

interface GenreCardProps {
  category: Category;
}

const GenreCard: React.FC<GenreCardProps> = ({ category }) => {
  const router = useRouter();
  return (
    <div
      key={category.name}
      onClick={() => router.push(`/search/${category.name.toLowerCase()}`)}
      className="cursor-pointer rounded-3xl relative overflow-hidden shadow-md group h-64 transition-transform hover:scale-[1.02] bg-white dark:bg-zinc-900"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-300"
      />
      <div className="absolute inset-0 flex flex-col justify-end items-start p-6 z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent">
        <div className="text-white space-y-1">
          <div className="mb-1 text-xl">{category.icon}</div>
          <span className="text-2xl font-semibold drop-shadow-sm">{category.name}</span>
        </div>
      </div>
    </div>
  );
};

export default GenreCard;
