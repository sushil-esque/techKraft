import React from "react";

const Favorites: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Properties</h1>
      <p className="text-gray-600">Saved listings that you check out later.</p>
      <div className="mt-10 p-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg text-center font-medium">
        No favorites saved yet.
      </div>
    </div>
  );
};

export default Favorites;
