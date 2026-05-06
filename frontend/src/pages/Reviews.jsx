import React, {
  useState
} from "react";

import API from "../services/api";

import {
  Star,
  Send,
  MessageSquare,
  Mail,
  Sparkles,
  CheckCircle
} from "lucide-react";

export default function Reviews() {

  const [formData, setFormData] =
    useState({

      guide_email: "",

      rating: 5,

      comment: ""
    });

  const [hoveredStar, setHoveredStar] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const touristEmail =
    localStorage.getItem(
      "email"
    );

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  const submitReview = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    setSuccess(false);

    try {

      const reviewData = {

        tourist_email:
          touristEmail,

        guide_email:
          formData.guide_email,

        rating:
          parseInt(
            formData.rating
          ),

        comment:
          formData.comment
      };

      const res = await API.post(
        "/auth/reviews",
        reviewData
      );

      console.log(res.data);

      setSuccess(true);

      setFormData({

        guide_email: "",

        rating: 5,

        comment: ""
      });

    } catch (err) {

      console.log(err);

      alert(
        "Review failed"
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

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_0_60px_rgba(139,92,246,0.35)] overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-white/10 p-8 text-center">

          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-5">

            <Sparkles className="w-4 h-4 text-yellow-400" />

            <span className="text-white text-sm font-medium">

              Share Your Experience

            </span>

          </div>

          <h1 className="text-4xl font-black text-white mb-3">

            Review Your Guide ⭐

          </h1>

          <p className="text-gray-300 max-w-lg mx-auto">

            Help other travelers by sharing your
            experience with your travel guide.

          </p>

        </div>

        {/* Success */}
        {success && (

          <div className="mx-8 mt-6 bg-green-500/10 border border-green-500/30 text-green-300 px-5 py-4 rounded-2xl flex items-center gap-3">

            <CheckCircle className="w-5 h-5" />

            Review submitted successfully!

          </div>

        )}

        {/* Form */}
        <form
          onSubmit={submitReview}
          className="p-8 space-y-7"
        >

          {/* Guide Email */}
          <div>

            <label className="block text-sm font-semibold text-gray-200 mb-3">

              Guide Email

            </label>

            <div className="relative">

              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="email"
                name="guide_email"
                value={
                  formData.guide_email
                }
                onChange={handleChange}
                required
                placeholder="Enter guide email"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

            </div>

          </div>

          {/* Rating */}
          <div>

            <label className="block text-sm font-semibold text-gray-200 mb-4">

              Rating

            </label>

            <div className="flex items-center gap-3">

              {[1, 2, 3, 4, 5].map(
                (star) => (

                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() =>
                      setHoveredStar(
                        star
                      )
                    }
                    onMouseLeave={() =>
                      setHoveredStar(
                        0
                      )
                    }
                    onClick={() =>
                      setFormData({
                        ...formData,
                        rating:
                          star
                      })
                    }
                    className="transition-transform duration-200 hover:scale-125"
                  >

                    <Star
                      className={`w-10 h-10 ${
                        star <=
                        (
                          hoveredStar ||

                          formData.rating
                        )

                        ? `
                          text-yellow-400
                          fill-yellow-400
                        `

                        : `
                          text-gray-500
                        `
                      }`}
                    />

                  </button>

                )
              )}

            </div>

          </div>

          {/* Comment */}
          <div>

            <label className="block text-sm font-semibold text-gray-200 mb-3">

              Your Review

            </label>

            <div className="relative">

              <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-gray-400" />

              <textarea
                name="comment"
                value={
                  formData.comment
                }
                onChange={handleChange}
                required
                placeholder="Write your travel experience..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-40 resize-none"
              />

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
          >

            <Send className="w-5 h-5" />

            {
              loading

              ? "Submitting..."

              : "Submit Review"
            }

          </button>

        </form>

      </div>

    </div>
  );
}