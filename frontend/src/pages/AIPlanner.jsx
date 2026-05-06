import { useState } from "react";

import API from "../services/api";

export default function AIPlanner() {

    const [formData, setFormData] = useState({
        destination: "",
        days: "",
        budget: "",
        interests: ""
    });

    const [tripPlan, setTripPlan] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const userEmail =
        localStorage.getItem("email");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const generatePlan = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await API.post(
                "/ai/trip-plan",
                formData
            );

            setTripPlan(
                res.data.trip_plan
            );

        } catch (err) {

            console.log(err);

            alert(
                "AI generation failed"
            );

        } finally {

            setLoading(false);
        }
    };

    const saveTrip = async () => {

        if(!tripPlan){

            alert(
                "Generate a trip first"
            );

            return;
        }

        try {

            const saveData = {

                user_email:
                    userEmail,

                destination:
                    formData.destination,

                trip_plan:
                    tripPlan
            };

            const res = await API.post(
                "/ai/save-trip",
                saveData
            );

            alert(
                res.data.message
            );

        } catch (err) {

            console.log(err);

            alert(
                "Save failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 text-white p-6 md:p-10">

            <h1 className="text-5xl font-bold text-center mb-10">

                AI Trip Planner ✨

            </h1>

            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">

                <form
                    onSubmit={generatePlan}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-semibold">

                            Destination

                        </label>

                        <input
                            type="text"
                            name="destination"
                            placeholder="e.g. Hyderabad"
                            value={formData.destination}
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl bg-white/20 outline-none placeholder-gray-300"
                        />

                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>

                            <label className="block mb-2 font-semibold">

                                Number of Days

                            </label>

                            <input
                                type="number"
                                name="days"
                                placeholder="e.g. 3"
                                value={formData.days}
                                onChange={handleChange}
                                className="w-full p-4 rounded-xl bg-white/20 outline-none placeholder-gray-300"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 font-semibold">

                                Budget (₹)

                            </label>

                            <input
                                type="number"
                                name="budget"
                                placeholder="e.g. 15000"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full p-4 rounded-xl bg-white/20 outline-none placeholder-gray-300"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Interests

                        </label>

                        <input
                            type="text"
                            name="interests"
                            placeholder="e.g. Food, History, Adventure"
                            value={formData.interests}
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl bg-white/20 outline-none placeholder-gray-300"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 transition p-4 rounded-xl font-bold text-lg"
                    >

                        {
                            loading
                            ? "Generating..."
                            : "Generate AI Plan"
                        }

                    </button>

                </form>

                {tripPlan && (

                    <div className="mt-10">

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5">

                            <h2 className="text-3xl font-bold">

                                Your AI Trip Plan 🌍

                            </h2>

                            <button
                                onClick={saveTrip}
                                className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-xl font-bold"
                            >

                                ❤️ Save Trip

                            </button>

                        </div>

                        <div className="bg-black/20 p-6 rounded-2xl whitespace-pre-wrap leading-8 text-gray-100 border border-white/10">

                            {tripPlan}

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}