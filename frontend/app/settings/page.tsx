"use client";

import { Switch } from "@/components/ui/switch";
import { SettingOptions } from "@/constants/constants";
import useTheme from "@/hooks/useTheme";
import { ChevronRight } from "lucide-react";
import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <main className="w-full h-full mx-auto pt-16 flex flex-col items-start justify-start gap-1">
        {SettingOptions.map((option, index) => (
          <Tile key={index} icon={option.icon} text={option.name} />
        ))}
      </main>
    </div>
  );
};

const Tile = ({
  icon,
  text,
  onClick = () => console.log(`Clicked: ${text}`),
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <div className="w-full max-w-sm mx-auto p-2 border-b-gray-400">
      <div
        className="w-full justify-start h-auto px-4 py-3 hover:bg-gray-100 transition cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              {icon}
            </div>
            <span className="text-sm font-medium text-gray-900">{text}</span>
          </div>
          {text === "Dark Mode" ? (
            <DarKModeToggle />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};

const DarKModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Switch
      className="cursor-pointer"
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
    />
  );
};

export default Settings;
