"use client";
import { Button } from "@/components/ui/button";
import { Badge, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
const timelineData = {
  "March 12": [
    { category: "Technology", count: 21 },
    { category: "Politics", count: 16 },
    { category: "Government", count: 10 },
    { category: "Sports", count: 8 },
  ],
  "March 11": [
    { category: "Technology", count: 25 },
    { category: "Science", count: 20 },
    { category: "Politics", count: 16 },
    { category: "Entertainment", count: 14 },
    { category: "Celebrities", count: 10 },
    { category: "Startups", count: 8 },
    { category: "Government", count: 7 },
  ],
  "March 10": [
    { category: "Entertainment", count: 14 },
    { category: "Celebrities", count: 10 },
    { category: "Startups", count: 8 },
  ],
};

const years = [2025, 2024, 2023, 2022, 2021];
const months = ["March", "Feb", "Jan"];
const Timeline = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Date Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex space-x-8">
                <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                  March 12
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  March 11
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  March 10
                </button>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Timeline Content */}
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(timelineData).map(([date, categories]) => (
                <div key={date} className="space-y-3">
                  <h3 className="font-medium text-gray-900 mb-4">{date}</h3>
                  <div className="space-y-2">
                    {categories.map((item, index) => (
                      <Badge
                        key={index}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm font-medium cursor-pointer transition-colors"
                      >
                        <span className="mr-2 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
                          {item.count}
                        </span>
                        {item.category}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-48 p-6">
          <div className="space-y-6">
            {/* Current Year/Month */}
            <div className="text-right">
              <div className="text-blue-600 font-medium text-lg">2025</div>
              <div className="space-y-1 mt-2">
                {months.map((month) => (
                  <div
                    key={month}
                    className={`text-sm cursor-pointer hover:text-blue-600 ${
                      month === "March"
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-300"></div>

            {/* Previous Years */}
            <div className="text-right space-y-2">
              {years.slice(1).map((year) => (
                <div
                  key={year}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer text-sm"
                >
                  {year}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Timeline;
