import React from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  Moon,
  Sun,
  LogOut,
  Map,
  MessageSquare,
  Bot,
  Plane,
  Heart,
  Star,
  Compass
} from "lucide-react";

import {
  useTheme
} from "../context/ThemeContext";

export default function TouristDashboard() {

  const navigate = useNavigate();

  const {
    darkMode,
    toggleTheme
  } = useTheme();

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  const features = [

    {
      title: "Explore Guides",
      icon: Compass,
      color: "from-blue-500 to-cyan-500",
      link: "/guides"
    },

    {
      title: "Explore Map",
      icon: Map,
      color: "from-green-500 to-emerald-500",
      link: "/map"
    },

    {
      title: "Open Chat",
      icon: MessageSquare,
      color: "from-yellow-500 to-orange-500",
      link: "/chat"
    },

    {
      title: "Review Guides",
      icon: Star,
      color: "from-orange-500 to-red-500",
      link: "/reviews"
    },

    {
      title: "AI Assistant",
      icon: Bot,
      color: "from-pink-500 to-rose-500",
      link: "/ai-chat"
    },

    {
      title: "AI Planner",
      icon: Plane,
      color: "from-purple-500 to-indigo-500",
      link: "/ai-planner"
    },

    {
      title: "Saved Trips",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      link: "/saved-trips"
    }
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 dark:from-gray-950 dark:via-slate-900 dark:to-black transition-all duration-500">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-gradient-to-r from-blue-700/90 via-purple-700/90 to-indigo-700/90 dark:from-gray-900/95 dark:via-black/95 dark:to-gray-900/95 border-b border-white/10 shadow-2xl">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <div>

            <h1 className="text-4xl font-black text-white tracking-tight">

              GuideMate AI ✈️

            </h1>

            <p className="text-blue-100 text-sm">

              Smart AI Travel Companion

            </p>

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Profile */}
            <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl">

              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">

                {
                  localStorage
                    .getItem("email")
                    ?.charAt(0)
                    .toUpperCase()
                }

              </div>

              <div className="flex flex-col">

                <span className="text-xs text-gray-200">

                  Logged in as

                </span>

                <span className="text-sm font-semibold text-white">

                  {
                    localStorage.getItem("email")
                  }

                </span>

              </div>

            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition-all duration-300 shadow-lg hover:scale-105"
            >

              <div className="flex items-center gap-2 text-white">

                {
                  darkMode
                  ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-300" />
                      <span>
                        Light
                      </span>
                    </>
                  )
                  : (
                    <>
                      <Moon className="w-5 h-5 text-blue-200" />
                      <span>
                        Dark
                      </span>
                    </>
                  )
                }

              </div>

            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            >

              <div className="flex items-center gap-2">

                <LogOut className="w-4 h-4" />

                Logout

              </div>

            </button>

          </div>

        </div>

      </nav>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-600 dark:from-purple-950 dark:via-indigo-950 dark:to-black p-10 md:p-14 shadow-[0_0_60px_rgba(99,102,241,0.4)] border border-white/10">

          <div className="relative z-10">

            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">

              Explore The World
              <br />
              With AI 🌍

            </h2>

            <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">

              Plan smarter trips, connect with expert guides,
              chat instantly, and build unforgettable travel
              experiences powered by artificial intelligence.

            </p>

          </div>

          {/* Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 blur-3xl rounded-full"></div>

        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <a
                href={feature.link}
                key={index}
                className="group relative overflow-hidden bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]"
              >

                {/* Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition duration-500`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}>

                  <Icon className="w-8 h-8 text-white" />

                </div>

                {/* Content */}
                <div className="mt-6">

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">

                    {feature.title}

                  </h3>

                  <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">

                    Access the {feature.title.toLowerCase()} feature
                    and enhance your travel experience.

                  </p>

                </div>

              </a>
            );
          })}

        </div>

      </div>

    </div>
  );
}