import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  Hash,
  House,
  Image,
  Scissors,
  SquarePen,
  FileText,
  Users,
  LogOut,
  FolderKanban, 
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out z-10`}
    >
      <div className="my-7 w-full">
        <img
          src={user.imageUrl}
          alt="User avatar"
          className="w-13 rounded-full mx-auto"
        />
        <h1 className="mt-1 text-center">{user.fullName}</h1>

        <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                  isActive
                    ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white"
                    : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}

          {/* ✅ NEW PROJECT MANAGEMENT BUTTON */}
          {/* 🚀 UNIQUE PROJECT MANAGEMENT BUTTON */}
          <a
            href="https://project-management-gs.vercel.app/"
            onClick={() => setSidebar(false)}
            className="relative px-4 py-3 mt-4 flex items-center gap-3 rounded-xl 
                       bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                       text-white font-semibold shadow-lg
                       hover:shadow-purple-400/50
                       transition-all duration-300
                       hover:scale-105 active:scale-95
                       overflow-hidden group"
          >
            {/* Animated Glow Effect */}
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-300 rounded-xl"></span>

            {/* Icon with subtle animation */}
            <FolderKanban className="w-5 h-5 group-hover:rotate-6 transition duration-300" />

            <span className="relative z-10 tracking-wide">
              Project Manager
            </span>
          </a>
        </div>
      </div>

      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img
            src={user.imageUrl}
            alt="User avatar"
            className="w-8 rounded-full"
          />
          <div>
            <h1 className="text-sm font-medium">{user.fullName}</h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>{" "}
              Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;