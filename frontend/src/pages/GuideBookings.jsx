import React, {
  useEffect,
  useState,
  useMemo
} from "react";

import API from "../services/api";

import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Mail,
  MapPin,
  Star,
  Briefcase,
  Sparkles,
  User
} from "lucide-react";

export default function GuideBookings() {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const guideEmail =
    localStorage.getItem(
      "email"
    );

  const statusOptions = [
    "All",
    "pending",
    "accepted",
    "rejected"
  ];

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        `/auth/bookings/${guideEmail}`
      );

      const formattedBookings =
        res.data.map((booking, index) => ({

          ...booking,

          id:
            booking._id || index,

          touristName:
            booking.tourist_name ||

            booking.tourist_email
              ?.split("@")[0],

          destination:
            booking.destination ||
            "Travel Destination",

          date:
            booking.date ||
            new Date(),

          rating:
            4.8,

          type:
            booking.trip_type ||
            "AI Guided Tour",

          touristPhoto:
            `https://picsum.photos/seed/${index}/200/200`
        }));

      setBookings(
        formattedBookings
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  const updateStatus = async (
    bookingId,
    status
  ) => {

    try {

      await API.put(
        `/auth/bookings/${bookingId}?status=${status}`
      );

      setBookings((prev) =>

        prev.map((booking) =>

          booking.id === bookingId

          ? {
              ...booking,
              status
            }

          : booking
        )
      );

      alert(
        `Booking ${status}`
      );

    } catch (err) {

      console.log(err);
    }
  };

  const filteredBookings =
    useMemo(() => {

      return bookings.filter(
        (booking) => {

          const matchesSearch =

            booking.tourist_email
              ?.toLowerCase()
              .includes(
                searchQuery.toLowerCase()
              )

            ||

            booking.destination
              ?.toLowerCase()
              .includes(
                searchQuery.toLowerCase()
              );

          const matchesStatus =

            statusFilter ===
            "All"

            ||

            booking.status ===
            statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

    }, [
      bookings,
      searchQuery,
      statusFilter
    ]);

  const getStatusColor = (
    status
  ) => {

    switch(status){

      case "accepted":

        return `
          bg-green-500/20
          text-green-500
          border-green-500/30
        `;

      case "rejected":

        return `
          bg-red-500/20
          text-red-500
          border-red-500/30
        `;

      default:

        return `
          bg-yellow-500/20
          text-yellow-500
          border-yellow-500/30
        `;
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 dark:from-gray-950 dark:via-slate-900 dark:to-black transition-all duration-500 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-40 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full shadow-lg mb-6">

            <Briefcase className="w-4 h-4 text-purple-500" />

            <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">

              Guide Dashboard

            </span>

          </div>

          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4">

            Booking Requests 📅

          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">

            Manage tourist requests,
            approve bookings,
            and organize guided tours.

          </p>

        </div>

        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">

          {/* Search */}
          <div className="flex-1 relative">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search tourists or destinations..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

          </div>

          {/* Filter */}
          <div className="flex gap-3 overflow-x-auto">

            {statusOptions.map(
              (status) => (

                <button
                  key={status}
                  onClick={() =>
                    setStatusFilter(
                      status
                    )
                  }
                  className={`px-5 py-3 rounded-2xl whitespace-nowrap font-semibold transition-all duration-300 ${
                    statusFilter ===
                    status

                    ? `
                      bg-gradient-to-r
                      from-purple-600
                      to-blue-600
                      text-white
                      shadow-lg
                    `

                    : `
                      bg-white/50
                      dark:bg-white/5
                      backdrop-blur-xl
                      border
                      border-white/20
                      dark:border-white/10
                      text-gray-700
                      dark:text-gray-300
                    `
                  }`}
                >

                  <Filter className="inline w-4 h-4 mr-2" />

                  {status}

                </button>

              )
            )}

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* Pending */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 backdrop-blur-xl">

            <p className="text-yellow-500 text-sm font-semibold">

              Pending Requests

            </p>

            <h2 className="text-4xl font-black text-white mt-2">

              {
                bookings.filter(
                  (b) =>
                    b.status ===
                    "pending"
                ).length
              }

            </h2>

          </div>

          {/* Accepted */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6 backdrop-blur-xl">

            <p className="text-green-500 text-sm font-semibold">

              Accepted Tours

            </p>

            <h2 className="text-4xl font-black text-white mt-2">

              {
                bookings.filter(
                  (b) =>
                    b.status ===
                    "accepted"
                ).length
              }

            </h2>

          </div>

          {/* Rejected */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6 backdrop-blur-xl">

            <p className="text-red-500 text-sm font-semibold">

              Rejected

            </p>

            <h2 className="text-4xl font-black text-white mt-2">

              {
                bookings.filter(
                  (b) =>
                    b.status ===
                    "rejected"
                ).length
              }

            </h2>

          </div>

        </div>

        {/* Loading */}
        {loading ? (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {[1,2,3,4].map((item) => (

              <div
                key={item}
                className="h-[320px] rounded-[2rem] bg-white/10 dark:bg-white/5 animate-pulse border border-white/10"
              ></div>

            ))}

          </div>

        ) : filteredBookings.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-24 text-center">

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-6 shadow-2xl mb-6">

              <Sparkles className="w-14 h-14 text-white" />

            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">

              No Booking Requests

            </h2>

            <p className="text-gray-600 dark:text-gray-400 max-w-md">

              New tourist booking requests will appear here.

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {filteredBookings.map(
              (booking) => (

                <div
                  key={booking.id}
                  className="group relative overflow-hidden bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01]"
                >

                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:via-blue-500/5 group-hover:to-cyan-500/10 transition-all duration-500"></div>

                  <div className="relative z-10 p-7">

                    {/* Tourist */}
                    <div className="flex items-center gap-4 mb-6">

                      <img
                        src={
                          booking.touristPhoto
                        }
                        alt="Tourist"
                        className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl"
                      />

                      <div className="flex-1">

                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">

                          {
                            booking.touristName
                          }

                        </h2>

                        <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-300">

                          <Mail className="w-4 h-4" />

                          <span className="text-sm">

                            {
                              booking.tourist_email
                            }

                          </span>

                        </div>

                      </div>

                      {/* Status */}
                      <div className={`px-4 py-2 rounded-full border text-sm font-bold ${getStatusColor(booking.status)}`}>

                        {booking.status}

                      </div>

                    </div>

                    {/* Details */}
                    <div className="space-y-4">

                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">

                        <MapPin className="w-5 h-5 text-purple-500" />

                        <span>

                          {
                            booking.destination
                          }

                        </span>

                      </div>

                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">

                        <Calendar className="w-5 h-5 text-blue-500" />

                        <span>

                          {
                            new Date(
                              booking.date
                            ).toLocaleDateString()
                          }

                        </span>

                      </div>

                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">

                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />

                        <span>

                          {booking.rating}

                        </span>

                      </div>

                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">

                        <Clock className="w-5 h-5 text-pink-500" />

                        <span>

                          {
                            booking.type
                          }

                        </span>

                      </div>

                    </div>

                    {/* Buttons */}
                    {booking.status ===
                    "pending" && (

                      <div className="flex flex-col md:flex-row gap-4 mt-8">

  {/* Accept */}
  <button
    onClick={() =>
      updateStatus(
        booking.id,
        "accepted"
      )
    }
    className="
      flex-1
      flex
      items-center
      justify-center
      gap-2
      bg-gradient-to-r
      from-green-500
      to-emerald-500
      text-white
      px-6
      py-3
      rounded-2xl
      font-semibold
      hover:shadow-lg
      hover:shadow-green-500/30
      transition-all
      duration-300
      hover:scale-105
    "
  >

    <CheckCircle className="w-5 h-5" />

    Accept

  </button>

  {/* Reject */}
  <button
    onClick={() =>
      updateStatus(
        booking.id,
        "rejected"
      )
    }
    className="
      flex-1
      flex
      items-center
      justify-center
      gap-2
      bg-gradient-to-r
      from-red-500
      to-pink-500
      text-white
      px-6
      py-3
      rounded-2xl
      font-semibold
      hover:shadow-lg
      hover:shadow-red-500/30
      transition-all
      duration-300
      hover:scale-105
    "
  >

    <XCircle className="w-5 h-5" />

    Reject

  </button>

  {/* Open Chat */}
  <button
    onClick={() => {

      localStorage.setItem(
        "selectedTourist",
        booking.tourist_email
      );

      window.location.href =
        "/guide-chat";
    }}
    className="
      flex-1
      flex
      items-center
      justify-center
      gap-2
      bg-gradient-to-r
      from-blue-500
      to-cyan-500
      text-white
      px-6
      py-3
      rounded-2xl
      font-semibold
      hover:shadow-lg
      hover:shadow-blue-500/30
      transition-all
      duration-300
      hover:scale-105
    "
  >

    💬 Open Chat

  </button>

</div>

                    )}

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}