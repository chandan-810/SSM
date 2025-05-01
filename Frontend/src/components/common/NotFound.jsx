import React from "react";
import { memo } from "react";
import { Link } from "react-router-dom";

const NotFound = ({ redirectTo }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found!
        </h2>
        <Link
          to={redirectTo}
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default memo(NotFound);
