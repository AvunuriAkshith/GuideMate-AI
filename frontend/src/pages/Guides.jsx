import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import {
  useNavigate
} from "react-router-dom";

import {
  MapPin,
  Star,
  MessageCircle,
  BadgeCheck,
  Search,
  Sparkles
} from "lucide-react";

export default function Guides() {

  const [guides, setGuides] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedLanguage, setSelectedLanguage] =
    useState("All");

  const navigate =
    useNavigate();

  const touristEmail =
    localStorage.getItem(
      "email"
    );

  useEffect(() => {

    fetchGuides();

  }, []);

  const fetchGuides = async () => {

    try {

      const res = await API.get(
        "/auth/guides"
      );

      setGuides(
        res.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  const bookGuide = async (
    guideEmail
  ) => {

    try {

      const bookingData = {

        tourist_email:
          touristEmail,

        guide_email:
          guideEmail,

        date:
          new Date().toISOString()
      };

      const res = await API.post(
        "/auth/bookings",
        bookingData
      );

      alert(
        res.data.message
      );

    } catch (err) {

      console.log(err);

      alert(
        "Booking failed"
      );
    }
  };

  const filteredGuides =
    guides.filter((guide) => {

      const matchesSearch =

        guide.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        guide.location
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesLanguage =

        selectedLanguage ===
        "All"

        ||

        guide.languages?.includes(
          selectedLanguage
        );

      return (
        matchesSearch &&
        matchesLanguage
      );
    });

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 dark:from-gray-950 dark:via-slate-900 dark:to-black p-6 md:p-10 transition-all duration-500">

      {/* Hero Section */}
      <div className="text-center mb-16">

        <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-full shadow-lg mb-6">

          <Sparkles className="w-4 h-4 text-yellow-400" />

          <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">

            GuideMate AI

          </span>

        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent leading-tight">

          Discover Expert
          <br />

          Travel Guides 🌍

        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">

          Connect with verified local guides,
          plan unforgettable adventures,
          and explore destinations with
          AI-powered travel experiences.

        </p>

      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-14">

        {/* Search */}
        <div className="flex-1 relative">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search guides or locations..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full pl-12 pr-4 py-4 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

        {/* Language Filter */}
        <select
          value={selectedLanguage}
          onChange={(e) =>
            setSelectedLanguage(
              e.target.value
            )
          }
          className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >

          <option value="All">
            All Languages
          </option>

          <option value="English">
            English
          </option>

          <option value="Hindi">
            Hindi
          </option>

          <option value="Telugu">
            Telugu
          </option>

        </select>

      </div>

      {/* Empty State */}
      {filteredGuides.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-24 text-center">

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-6 shadow-2xl mb-6">

            <Search className="w-12 h-12 text-white" />

          </div>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">

            No Guides Found

          </h2>

          <p className="text-gray-500 dark:text-gray-400">

            Try different search keywords.

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {filteredGuides.map((guide) => (

            <div
              key={guide._id}
              className="group relative overflow-hidden bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]"
            >

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 transition-all duration-500"></div>

              {/* Header */}
              <div className="relative bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 h-44 flex justify-center items-center overflow-hidden">

                {/* Glow */}
                <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

                {/* Profile Image */}
                <img
                  src={
                    guide.profile_photo ||

                    "https://via.placeholder.com/150"
                  }
                  alt="Guide"
                  className="relative z-10 w-28 h-28 rounded-full object-cover border-4 border-white shadow-2xl"
                />

                {/* Status */}
                <div className="absolute top-5 right-5 flex items-center gap-2 bg-white/20 backdrop-blur-xl px-3 py-1 rounded-full border border-white/20">

                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

                  <span className="text-xs text-white font-medium">

                    Online

                  </span>

                </div>

              </div>

              {/* Content */}
              <div className="relative z-10 p-7">

                {/* Name */}
                <h2 className="text-3xl font-black text-center text-gray-900 dark:text-white flex justify-center items-center gap-2">

                  {guide.name}

                  <BadgeCheck className="w-6 h-6 text-blue-500" />

                </h2>

                {/* Location */}
                <p className="flex justify-center items-center gap-2 text-gray-600 dark:text-gray-300 mt-3">

                  <MapPin className="w-4 h-4" />

                  {
                    guide.location ||

                    "Location not added"
                  }

                </p>

                {/* Rating */}
                <div className="flex justify-center items-center gap-2 mt-4">

                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />

                  <span className="text-lg font-bold text-yellow-500">

                    {
                      guide.rating || 4.5
                    }

                  </span>

                </div>

                {/* Bio */}
                <div className="mt-6">

                  <p className="font-bold text-gray-900 dark:text-white">

                    About Guide

                  </p>

                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-3">

                    {
                      guide.bio ||

                      "No bio added"
                    }

                  </p>

                </div>

                {/* Languages */}
                <div className="mt-6">

                  <p className="font-bold text-gray-900 dark:text-white">

                    Languages

                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {guide.languages?.map(
                      (lang, index) => (

                        <span
                          key={index}
                          className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-4 py-1 rounded-full text-sm backdrop-blur-xl"
                        >

                          {lang}

                        </span>

                      )
                    )}

                  </div>

                </div>

                {/* Specialization */}
                <div className="mt-6">

                  <p className="font-bold text-gray-900 dark:text-white">

                    Specialization

                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {guide.specialization?.map(
                      (spec, index) => (

                        <span
                          key={index}
                          className="bg-purple-500/10 text-purple-500 border border-purple-500/20 px-4 py-1 rounded-full text-sm backdrop-blur-xl"
                        >

                          {spec}

                        </span>

                      )
                    )}

                  </div>

                </div>

                {/* Price */}
                <div className="mt-8">

                  <div className="flex justify-between items-center mb-6">

                    <div>

                      <p className="text-gray-500 dark:text-gray-400 text-sm">

                        Price / Day

                      </p>

                      <p className="text-3xl font-black text-green-500">

                        ₹{
                          guide.price_per_day || 0
                        }

                      </p>

                    </div>

                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        bookGuide(
                          guide.email
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                    >

                      Book

                    </button>

                    <button
                      onClick={() =>
                        navigate("/chat")
                      }
                      className="flex-1 flex items-center justify-center gap-2 bg-white/10 dark:bg-white/5 border border-white/10 backdrop-blur-xl text-gray-800 dark:text-white px-6 py-3 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >

                      <MessageCircle className="w-4 h-4" />

                      Chat

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}