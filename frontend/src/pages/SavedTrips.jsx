import React, {
  useState,
  useMemo,
  useEffect
} from "react";

import API from "../services/api";

import {
  Heart,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  Star,
  Search,
  Filter,
  LayoutGrid,
  TrendingUp,
  Compass,
  Sparkles
} from "lucide-react";

export default function SavedTrips() {

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [trips, setTrips] =
    useState([]);

  const userEmail =
    localStorage.getItem(
      "email"
    );

  const categories = [
    "All",
    "AI Generated"
  ];

  useEffect(() => {

    fetchTrips();

  }, []);

  const fetchTrips = async () => {

    try {

      const res = await API.get(
        `/ai/saved-trips/${userEmail}`
      );

      const formattedTrips =
        res.data.map((trip, index) => ({

          ...trip,

          id:
            trip._id || index,

          duration:
            "Custom Plan",

          budget:
            "Flexible",

          category:
            "AI Generated",

          rating:
            4.9,

          savedDate:
            new Date(),

          image:
            `https://picsum.photos/seed/${index}/600/400`,

          aiSummary:
            "AI-generated personalized travel itinerary."
        }));

      setTrips(
        formattedTrips
      );

    } catch (err) {

      console.log(err);
    }
  };

  const handleDeleteTrip = async (
    id
  ) => {

    try {

      await API.delete(
        `/ai/delete-trip/${id}`
      );

      setTrips((prev) =>
        prev.filter(
          (trip) =>
            trip.id !== id
        )
      );

    } catch (err) {

      console.log(err);

      alert(
        "Delete failed"
      );
    }
  };

  const filteredTrips = useMemo(() => {

    return trips.filter((trip) => {

      const matchesSearch =

        searchQuery === "" ||

        trip.destination
          ?.toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          ) ||

        trip.trip_plan
          ?.toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      const matchesCategory =

        selectedCategory === "All" ||

        trip.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  }, [
    searchQuery,
    selectedCategory,
    trips
  ]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20 transition-colors duration-300 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse dark:bg-purple-600"></div>

        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse dark:bg-pink-600"></div>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Hero */}
        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30 dark:border-gray-700/30">

            <Compass className="w-4 h-4 text-purple-600 dark:text-purple-400" />

            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">

              Your Travel Vault

            </span>

          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">

            Saved Trips ❤️

          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">

            Your personalized AI-generated travel itineraries,
            ready for your next adventure.

          </p>

        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">

          {/* Search */}
          <div className="flex-1 relative group">

            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity"></div>

            <div className="relative">

              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                placeholder="Search destinations or itineraries..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                className="w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />

            </div>

          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto">

            {categories.map((cat) => (

              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(cat)
                }
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                  : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 border border-white/30 dark:border-gray-700/30 hover:scale-105"
                }`}
              >

                {
                  cat === "All"
                  ? (
                    <LayoutGrid className="inline w-4 h-4 mr-1" />
                  )
                  : (
                    <Filter className="inline w-4 h-4 mr-1" />
                  )
                }

                {cat}

              </button>

            ))}

          </div>

        </div>

        {/* Empty State */}
        {filteredTrips.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20 text-center">

            <div className="relative mb-6">

              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>

              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4 shadow-xl">

                <Heart className="w-12 h-12 text-white" />

              </div>

            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">

              No saved trips yet

            </h3>

            <p className="text-gray-600 dark:text-gray-400 max-w-md">

              Generate AI itineraries and save them
              to build your personal travel vault.

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {filteredTrips.map((trip) => (

              <div
                key={trip.id}
                className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-gray-700/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/20 overflow-hidden"
              >

                {/* Image */}
                <div className="relative h-56 overflow-hidden">

                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDeleteTrip(
                        trip.id
                      )
                    }
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-red-500/80 transition-all duration-300 hover:scale-110"
                  >

                    <Trash2 className="w-4 h-4 text-white" />

                  </button>

                  {/* Destination */}
                  <div className="absolute bottom-4 left-4 right-4">

                    <h3 className="text-2xl font-bold text-white mb-2">

                      {trip.destination}

                    </h3>

                    <div className="flex flex-wrap gap-3 text-sm text-white/90">

                      <span className="flex items-center gap-1">

                        <Calendar className="w-3.5 h-3.5" />

                        {trip.duration}

                      </span>

                      <span className="flex items-center gap-1">

                        <DollarSign className="w-3.5 h-3.5" />

                        {trip.budget}

                      </span>

                    </div>

                  </div>

                </div>

                {/* Content */}
                <div className="p-6">

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-2">

                      <div className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium">

                        {trip.category}

                      </div>

                      <div className="flex items-center gap-1">

                        <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />

                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">

                          {trip.rating}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* AI Preview */}
                  <div className="mb-4">

                    <div className="flex items-center gap-2 mb-2">

                      <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />

                      <span className="text-xs font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400">

                        AI Itinerary Preview

                      </span>

                    </div>

                    <div className="bg-purple-50/50 dark:bg-purple-900/20 rounded-2xl p-4">

                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap line-clamp-4">

                        {
                          trip.trip_plan ||
                          "No itinerary found."
                        }

                      </p>

                    </div>

                  </div>

                  {/* AI Summary */}
                  <div className="mb-5 p-3 bg-gradient-to-r from-purple-50/30 to-pink-50/30 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl border border-purple-200/50 dark:border-purple-800/30">

                    <div className="flex items-start gap-2">

                      <TrendingUp className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />

                      <p className="text-xs text-gray-600 dark:text-gray-400 italic">

                        {trip.aiSummary}

                      </p>

                    </div>

                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">

                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 flex items-center justify-center gap-2">

                      <Eye className="w-4 h-4" />

                      View Details

                    </button>

                    <button className="flex-1 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-white dark:hover:bg-gray-600 hover:scale-105 flex items-center justify-center gap-2">

                      <Heart className="w-4 h-4" />

                      Plan This

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}