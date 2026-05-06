import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import {
  DollarSign,
  Calendar,
  Star,
  Clock,
  TrendingUp,
  Briefcase,
  Bell,
  Sparkles,
  MapPin,
  Mail,
  CheckCircle,
  Eye,
  ChevronRight,
  LogOut,
  MessageCircle
} from "lucide-react";

export default function GuideDashboard() {

  const [guideProfile, setGuideProfile] =
    useState({});

  const [upcomingTours, setUpcomingTours] =
    useState([]);

  const [touristRequests, setTouristRequests] =
    useState([]);

  const [notifications, setNotifications] =
    useState([]);

  const [recentActivity, setRecentActivity] =
    useState([]);

  const guideEmail =
    localStorage.getItem(
      "email"
    );

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      // GUIDE PROFILE
      const profileRes =
        await API.get(
          `/auth/guide-profile/${guideEmail}`
        );

      setGuideProfile(
        profileRes.data
      );

      // BOOKINGS
      const bookingRes =
        await API.get(
          `/auth/bookings/${guideEmail}`
        );

      const bookings =
        bookingRes.data;

      setUpcomingTours(
        bookings
      );

      // REQUESTS
      setTouristRequests(
        bookings.filter(
          (b) =>
            b.status ===
            "pending"
        )
      );

      // NOTIFICATIONS
      setNotifications([
        {
          id: 1,
          title:
            "New Booking",
          message:
            "You received a new booking request.",
          time:
            "Just now"
        }
      ]);

      // ACTIVITY
      setRecentActivity(
        bookings.map(
          (b, index) => ({

            id:
              index,

            action:
              `Booking from ${b.tourist_email}`,

            time:
              "Recently"
          })
        )
      );

    } catch (err) {

      console.log(err);
    }
  };

  const logout = () => {

    localStorage.clear();

    window.location.href =
      "/";
  };

  const statsCards = [

    {
      title:
        "Total Earnings",

      value:
        `₹${upcomingTours.length * 2500}`,

      change:
        "+12%",

      icon:
        DollarSign,

      color:
        "from-emerald-500 to-teal-500"
    },

    {
      title:
        "Completed Tours",

      value:
        upcomingTours.filter(
          (b) =>
            b.status ===
            "accepted"
        ).length,

      change:
        "+8",

      icon:
        Briefcase,

      color:
        "from-blue-500 to-cyan-500"
    },

    {
      title:
        "Pending Requests",

      value:
        touristRequests.length,

      change:
        "+3",

      icon:
        Clock,

      color:
        "from-amber-500 to-orange-500"
    },

    {
      title:
        "Rating Score",

      value:
        "4.9",

      change:
        "+0.04",

      icon:
        Star,

      color:
        "from-purple-500 to-pink-500"
    },

    {
      title:
        "Monthly Growth",

      value:
        "23%",

      change:
        "+5%",

      icon:
        TrendingUp,

      color:
        "from-indigo-500 to-purple-500"
    }
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 dark:from-gray-950 dark:via-slate-900 dark:to-black transition-all duration-500 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-40 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* Navbar */}
        <nav className="bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-5 shadow-xl flex justify-between items-center mb-10">

          <div className="flex items-center gap-3">

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl shadow-lg">

              <Sparkles className="w-6 h-6 text-white" />

            </div>

            <div>

              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">

                Guide Dashboard

              </h1>

              <p className="text-sm text-gray-600 dark:text-gray-400">

                Manage your tours & bookings

              </p>

            </div>

          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
          >

            <LogOut className="w-4 h-4" />

            Logout

          </button>

        </nav>

        {/* Guide Profile */}
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl p-8 mb-10">

          <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">

            <img
              src={
                guideProfile.profile_photo ||

                "https://i.pravatar.cc/300?img=12"
              }
              alt="Guide"
              className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
            />

            <div className="flex-1 text-center lg:text-left">

              <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3">

                <h2 className="text-4xl font-black text-gray-900 dark:text-white">

                  {
                    guideProfile.name ||
                    "Guide"
                  }

                </h2>

                <div className="flex items-center gap-1 bg-green-500/20 border border-green-500/30 text-green-500 px-3 py-1 rounded-full text-sm font-bold w-fit mx-auto lg:mx-0">

                  <CheckCircle className="w-4 h-4" />

                  Verified

                </div>

              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-5 text-gray-700 dark:text-gray-300 mb-4">

                <span className="flex items-center gap-2">

                  <MapPin className="w-4 h-4 text-purple-500" />

                  {
                    guideProfile.location ||
                    "Location not added"
                  }

                </span>

                <span className="flex items-center gap-2">

                  <Mail className="w-4 h-4 text-blue-500" />

                  {guideEmail}

                </span>

              </div>

              <p className="text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">

                {
                  guideProfile.bio ||

                  "Professional travel guide helping tourists explore amazing destinations."
                }

              </p>

            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

          {statsCards.map((stat, idx) => (

            <div
              key={idx}
              className="group bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-500 hover:-translate-y-2"
            >

              <div className="flex items-center justify-between mb-4">

                <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color}`}>

                  <stat.icon className="w-5 h-5 text-white" />

                </div>

                <span className="text-green-500 text-sm font-bold">

                  {stat.change}

                </span>

              </div>

              <h3 className="text-3xl font-black text-gray-900 dark:text-white">

                {stat.value}

              </h3>

              <p className="text-gray-600 dark:text-gray-400 mt-2">

                {stat.title}

              </p>

            </div>

          ))}

        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* Bookings */}
          <button
            onClick={() =>
              window.location.href =
                "/guide-bookings"
            }
            className="group bg-gradient-to-r from-purple-600 to-blue-600 p-7 rounded-[2rem] text-left text-white shadow-2xl hover:scale-105 transition-all duration-300"
          >

            <div className="flex items-center justify-between mb-4">

              <Calendar className="w-10 h-10" />

              <ChevronRight className="group-hover:translate-x-1 transition" />

            </div>

            <h2 className="text-3xl font-black mb-2">

              Bookings

            </h2>

            <p className="text-white/80">

              Manage tourist requests and schedules.

            </p>

          </button>

          {/* Chat */}
          <button
            onClick={() =>
              window.location.href =
                "/guide-chat"
            }
            className="group bg-gradient-to-r from-cyan-500 to-blue-500 p-7 rounded-[2rem] text-left text-white shadow-2xl hover:scale-105 transition-all duration-300"
          >

            <div className="flex items-center justify-between mb-4">

              <MessageCircle className="w-10 h-10" />

              <ChevronRight className="group-hover:translate-x-1 transition" />

            </div>

            <h2 className="text-3xl font-black mb-2">

              Chat

            </h2>

            <p className="text-white/80">

              Talk with tourists in real-time.

            </p>

          </button>

          {/* Reviews */}
          <button
            className="group bg-gradient-to-r from-pink-500 to-purple-500 p-7 rounded-[2rem] text-left text-white shadow-2xl hover:scale-105 transition-all duration-300"
          >

            <div className="flex items-center justify-between mb-4">

              <Star className="w-10 h-10" />

              <ChevronRight className="group-hover:translate-x-1 transition" />

            </div>

            <h2 className="text-3xl font-black mb-2">

              Reviews

            </h2>

            <p className="text-white/80">

              View tourist ratings and feedback.

            </p>

          </button>

        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">

          {/* Upcoming Tours */}
          <div className="xl:col-span-2 bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">

            <div className="flex items-center justify-between mb-6">

              <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">

                <Calendar className="w-6 h-6 text-purple-500" />

                Upcoming Tours

              </h3>

              <a
                href="/guide-bookings"
                className="text-purple-500 flex items-center gap-1 hover:gap-2 transition-all"
              >

                View All

                <ChevronRight className="w-4 h-4" />

              </a>

            </div>

            {upcomingTours.length === 0 ? (

              <div className="text-center py-20">

                <Calendar className="w-16 h-16 text-purple-500 mx-auto mb-5" />

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">

                  No Upcoming Tours

                </h2>

                <p className="text-gray-600 dark:text-gray-400">

                  Booking requests will appear here.

                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {upcomingTours.map((tour, index) => (

                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/10 transition-all duration-300"
                  >

                    <div>

                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">

                        {
                          tour.tourist_email
                        }

                      </h4>

                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">

                        <span className="flex items-center gap-1">

                          <Calendar className="w-4 h-4" />

                          {
                            new Date(
                              tour.date
                            ).toLocaleDateString()
                          }

                        </span>

                        <span className="flex items-center gap-1">

                          <Clock className="w-4 h-4" />

                          {
                            tour.status
                          }

                        </span>

                      </div>

                    </div>

                    <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-3 rounded-2xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">

                      <Eye className="w-4 h-4" />

                      View

                    </button>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* Notifications */}
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">

            <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3 mb-6">

              <Bell className="w-6 h-6 text-pink-500" />

              Notifications

            </h3>

            <div className="space-y-4">

              {notifications.map((notif) => (

                <div
                  key={notif.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300"
                >

                  <h4 className="font-bold text-gray-900 dark:text-white">

                    {notif.title}

                  </h4>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">

                    {notif.message}

                  </p>

                  <span className="text-xs text-purple-500 mt-2 block">

                    {notif.time}

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">

          <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3 mb-6">

            <Clock className="w-6 h-6 text-blue-500" />

            Recent Activity

          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            {recentActivity.map((activity) => (

              <div
                key={activity.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300"
              >

                <h4 className="font-bold text-gray-900 dark:text-white">

                  {activity.action}

                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">

                  {activity.time}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}