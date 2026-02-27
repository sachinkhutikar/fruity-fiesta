import React from "react";
import { ViewState } from "../types";

interface NavbarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onLogout,
}) => {
  return (
    <nav className="bg-[#343a40] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onViewChange("home")}
          >
            <div className="bg-green-500 rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <i className="fas fa-leaf text-white text-sm"></i>
            </div>
            <span className="font-bold text-xl">Fruit Fiesta</span>
          </div>

          {/* Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onViewChange("home")}
              className={`px-3 py-2 rounded-md ${
                currentView === "home"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onViewChange("about")}
              className={`px-3 py-2 rounded-md ${
                currentView === "about"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              About Us
            </button>

            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};