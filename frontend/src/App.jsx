import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import GuideChat from "./pages/GuideChat";
import GuideBookings from "./pages/GuideBookings";

import TouristDashboard from "./pages/TouristDashboard";

import GuideDashboard from "./pages/GuideDashboard";

import Guides from "./pages/Guides";

import ProtectedRoute from "./routes/ProtectedRoute";

import TravelMap from "./pages/TravelMap";

import Chat from "./pages/Chat";

import Reviews from "./pages/Reviews";

import AIChatbot from "./pages/AIChatbot";

import SavedTrips from "./pages/SavedTrips";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
        <Route
  path="/guide-chat"
  element={<GuideChat />}
/>
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
  path="/ai-chat"
  element={<AIChatbot />}
/>
        <Route
          path="/tourist"
          element={
            <ProtectedRoute role="tourist">
              <TouristDashboard />
            </ProtectedRoute>
          }
        />
    <Route
  path="/saved-trips"
  element={<SavedTrips />}
/>
        <Route
          path="/guide"
          element={
            <ProtectedRoute role="guide">
              <GuideDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/"
  element={<Login />}
/>

<Route
  path="/login"
  element={<Login />}
/>
        <Route
  path="/guide-bookings"
  element={
    <ProtectedRoute role="guide">
      <GuideBookings />
    </ProtectedRoute>
  }
/>
        <Route
  path="/guides"
  element={<Guides />}
/>
<Route
  path="/chat"
  element={<Chat />}
/>
<Route
  path="/map"
  element={<TravelMap />}
/>
<Route
  path="/reviews"
  element={<Reviews />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;