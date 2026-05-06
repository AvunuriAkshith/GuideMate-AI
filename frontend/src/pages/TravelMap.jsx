import React, {
  useState
} from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import {
  MapPin,
  Star,
  Navigation,
  Sparkles
} from "lucide-react";

const icon = new L.Icon({

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  iconSize: [25, 41],

  iconAnchor: [12, 41]
});

export default function TravelMap() {

  const [selectedPlace, setSelectedPlace] =
    useState(null);

  const places = [

    {
      id: 1,

      name:
        "Charminar",

      position:
        [17.3616, 78.4747],

      description:
        "Historic monument and iconic landmark of Hyderabad.",

      rating:
        4.8,

      image:
        "https://images.unsplash.com/photo-1599661046827-dacde6976540?q=80&w=1200&auto=format&fit=crop"
    },

    {
      id: 2,

      name:
        "Golconda Fort",

      position:
        [17.3833, 78.4011],

      description:
        "Ancient fort famous for architecture and panoramic views.",

      rating:
        4.7,

      image:
        "https://images.unsplash.com/photo-1588416499018-df9f9f9a76d2?q=80&w=1200&auto=format&fit=crop"
    },

    {
      id: 3,

      name:
        "Ramoji Film City",

      position:
        [17.2543, 78.6808],

      description:
        "World-famous film city and entertainment destination.",

      rating:
        4.9,

      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (

    <div className="relative h-screen w-full overflow-hidden bg-black">

      {/* Top Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[92%] max-w-5xl">

        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_0_40px_rgba(139,92,246,0.25)] p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">

          <div>

            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-3">

              <Sparkles className="w-4 h-4 text-yellow-400" />

              <span className="text-sm text-white font-medium">

                Explore Destinations

              </span>

            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white">

              Travel Map 🌍

            </h1>

            <p className="text-gray-300 mt-2">

              Discover popular tourist attractions
              and plan your next adventure.

            </p>

          </div>

          {/* Selected Place */}
          {selectedPlace && (

            <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-white/10 rounded-3xl p-4 w-full md:w-[350px]">

              <div className="flex items-center gap-3 mb-3">

                <MapPin className="w-5 h-5 text-pink-400" />

                <h2 className="text-xl font-bold text-white">

                  {selectedPlace.name}

                </h2>

              </div>

              <p className="text-gray-300 text-sm mb-3">

                {
                  selectedPlace.description
                }

              </p>

              <div className="flex items-center gap-2 text-yellow-400">

                <Star className="w-4 h-4 fill-yellow-400" />

                <span className="font-semibold">

                  {selectedPlace.rating}

                </span>

              </div>

            </div>

          )}

        </div>

      </div>

      {/* Map */}
      <MapContainer
        center={[17.3850, 78.4867]}
        zoom={11}
        className="h-full w-full z-0"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place) => (

          <Marker
            key={place.id}
            position={place.position}
            icon={icon}
            eventHandlers={{
              click: () =>
                setSelectedPlace(
                  place
                )
            }}
          >

            <Popup>

              <div className="w-[220px] rounded-xl overflow-hidden">

                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />

                <h2 className="text-lg font-bold mb-2">

                  {place.name}

                </h2>

                <p className="text-gray-600 text-sm mb-3">

                  {
                    place.description
                  }

                </p>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-1 text-yellow-500">

                    <Star className="w-4 h-4 fill-yellow-500" />

                    <span className="font-semibold">

                      {place.rating}

                    </span>

                  </div>

                  <button className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition">

                    <Navigation className="w-4 h-4" />

                    Explore

                  </button>

                </div>

              </div>

            </Popup>

          </Marker>

        ))}

      </MapContainer>

      {/* Bottom Floating Info */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000]">

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-lg text-white flex items-center gap-3">

          <Navigation className="w-5 h-5 text-cyan-400" />

          <span className="font-medium">

            Interactive AI Travel Explorer

          </span>

        </div>

      </div>

    </div>
  );
}