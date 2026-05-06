import React, {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import API from "../services/api";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Plane,
  ShieldCheck
} from "lucide-react";

export default function Login() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      email: "",

      password: ""
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

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
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "email",
        formData.email
      );

      // Redirect by role
      if (
        res.data.role ===
        "tourist"
      ) {

        navigate(
          "/tourist"
        );

      } else if (
        res.data.role ===
        "guide"
      ) {

        navigate(
          "/guide"
        );

      } else {

        navigate("/");
      }

    } catch (err) {

      console.log(err);

      setError(
        "Invalid email or password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 flex items-center justify-center px-6 py-10">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-40 left-0 w-96 h-96 bg-purple-500/30 blur-3xl rounded-full animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 blur-3xl rounded-full animate-pulse"></div>

      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[2rem] shadow-[0_0_60px_rgba(139,92,246,0.35)] border border-white/10 backdrop-blur-2xl bg-white/10">

        {/* Left Section */}
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

              Explore
              <br />

              The World
              <br />

              Smarter 🌍

            </h2>

            <p className="text-lg text-purple-100 leading-relaxed max-w-lg">

              Connect with expert travel guides,
              generate AI-powered itineraries,
              and discover unforgettable adventures.

            </p>

          </div>

          {/* Features */}
          <div className="space-y-5 mt-10">

            {[
              "AI Travel Planning",
              "Verified Local Guides",
              "Smart Booking System",
              "Real-Time Chat Support"
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

        {/* Right Section */}
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

                Welcome Back

              </span>

            </div>

            <h2 className="text-4xl font-black text-white mb-3">

              Login Account

            </h2>

            <p className="text-gray-300">

              Continue your travel journey with AI.

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
                  placeholder="Enter your password"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
            >

              {
                loading

                ? "Signing In..."

                : "Login Now"
              }

            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 text-center">

            <p className="text-gray-300">

              Don’t have an account?

              <Link
                to="/register"
                className="text-purple-400 hover:text-purple-300 font-semibold ml-2"
              >

                Create Account

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}