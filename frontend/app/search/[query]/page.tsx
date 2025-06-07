"use client";
import { useParams } from "next/navigation";
import React from "react";

const SearchResultPage = () => {
  const { query } = useParams();

  return <div className="min-h-screen bg-gray-50 max-sm:pb-16 mt-17">
    <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-black text-4xl">{query}</h1>
    </div>
  </div>;
};

export default SearchResultPage;
