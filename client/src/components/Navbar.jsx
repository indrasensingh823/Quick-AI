import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { useTheme } from "../context/ThemeContext";

const Navbar = () => {

  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  // const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
      />

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Theme Toggle */}
        {/* <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {theme === "light" ? "🌙 Dark" : "☀ Light"}
        </button> */}

        {/* Auth */}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
          >
            Get started <ArrowRight className="w-4 h-4" />
          </button>
        )}

      </div>
    </div>
  );
};

export default Navbar;