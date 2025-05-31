import React from "react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="h-full bg-gray-50 pb-16">
      <main className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 flex flex-col items-center justify-start">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Profile</h1>
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6">
            <div className="border-4 border-blue-500 rounded-full p-1 mb-4 shadow-sm">
              <img
                src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 border-white object-cover"
              />
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-4">Abhishek Bharti</h2>

            <div className="flex gap-4">
              <Button className="rounded-full px-6 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">Settings</Button>
              <Button className="rounded-full px-6 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">Bookmarks</Button>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-3"> For You</h2>
            <div className="h-40 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow-inner flex items-center justify-center text-gray-600 italic">
              Carousel coming soon
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
