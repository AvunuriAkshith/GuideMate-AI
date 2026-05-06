import React, {
  useState
} from "react";

import API from "../services/api";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Plane,
  ShieldCheck,
  Users
} from "lucide-react";

export default function Register() {

  const navigate =
    useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

      role: "tourist"
    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const res = await API.post(
        "/auth/register",
        formData
      );

      alert(
        res.data.message
      );

      navigate("/");

    } catch (err) {

      console.log(err);

      setError(
        "Registration failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 flex items-center justify-center px-6 py-10">

      {/* Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-40 left-0 w-96 h-96 bg-purple-500/30 blur-3xl rounded-full animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 blur-3xl rounded-full animate-pulse"></div>

      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[2rem] shadow-[0_0_60px_rgba(139,92,246,0.35)] border border-white/10 backdrop-blur-2xl bg-white/10">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-purple-700/40 via-indigo-600/30 to-blue-600/30 border-r border-white/10">

          <div>

            <div className="flex items-center gap-3 mb-8">

              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-2xl shadow-lg">

                <Plane className="w-7 h-7 text-white" />

              </div>

              <div>

                <h1 className="text-3xl font-black text-white">

                  GuideMate AI

                </h1>

                <p className="text-purple-100 text-sm">

                  Smart AI Travel Platform

                </p>

              </div>

            </div>

            <h2 className="text-5xl font-black text-white leading-tight mb-6">

              Start Your
              <br />

              Travel
              <br />

              Journey ✈️

            </h2>

            <p className="text-lg text-purple-100 leading-relaxed max-w-lg">

              Join travelers and guides using
              AI-powered travel planning and
              premium booking experiences.

            </p>

          </div>

          {/* Features */}
          <div className="space-y-5 mt-10">

            {[
              "AI Trip Planning",
              "Verified Travel Guides",
              "Smart Booking System",
              "Premium Travel Experience"
            ].map((item, idx) => (

              <div
                key={idx}
                className="flex items-center gap-3"
              >

                <div className="bg-green-500/20 border border-green-500/30 p-2 rounded-xl">

                  <ShieldCheck className="w-5 h-5 text-green-400" />

                </div>

                <span className="text-white font-medium">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">

            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-2xl shadow-lg">

              <Plane className="w-6 h-6 text-white" />

            </div>

            <div>

              <h1 className="text-2xl font-black text-white">

                GuideMate AI

              </h1>

            </div>

          </div>

          <div className="text-center lg:text-left mb-8">

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-5">

              <Sparkles className="w-4 h-4 text-yellow-400" />

              <span className="text-sm text-white font-medium">

                Create New Account

              </span>

            </div>

            <h2 className="text-4xl font-black text-white mb-3">

              Register Now

            </h2>

            <p className="text-gray-300">

              Begin exploring smarter travel experiences.

            </p>

          </div>

          {/* Error */}
          {error && (

            <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl">

              {error}

            </div>

          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <div>

              <label className="block text-sm font-semibold text-gray-200 mb-2">

                Full Name

              </label>

              <div className="relative">

                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label className="block text-sm font-semibold text-gray-200 mb-2">

                Email Address

              </label>

              <div className="relative">

                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-semibold text-gray-200 mb-2">

                Password

              </label>

              <div className="relative">

                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type={
                    showPassword
                    ? "text"
                    : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create password"
                  className="w-full pl-12 pr-14 py-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >

                  {
                    showPassword

                    ? (
                      <EyeOff className="w-5 h-5" />
                    )

                    : (
                      <Eye className="w-5 h-5" />
                    )
                  }

                </button>

              </div>

            </div>

            {/* Role */}
            <div>

              <label className="block text-sm font-semibold text-gray-200 mb-2">

                Select Role

              </label>

              <div className="relative">

                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >

                  <option
                    value="tourist"
                    className="bg-gray-900"
                  >
                    Tourist
                  </option>

                  <option
                    value="guide"
                    className="bg-gray-900"
                  >
                    Guide
                  </option>

                </select>

              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
            >

              {
                loading

                ? "Creating Account..."

                : "Register Now"
              }

            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 text-center">

            <p className="text-gray-300">

              Already have an account?

              <Link
                to="/"
                className="text-purple-400 hover:text-purple-300 font-semibold ml-2"
              >

                Login

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}