import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="w-full aspect-w-16 aspect-h-9 mb-4 relative overflow-hidden rounded-xl">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className={`object-cover w-full h-full transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <h2 className="text-lg sm:text-xl font-bold line-clamp-2">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;