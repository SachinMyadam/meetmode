import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Events from "./pages/Events";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import QRNetwork from "./pages/QRNetwork";
import AI from "./pages/AI";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Interests from "./pages/Interests";
import NotFound from "./pages/NotFound";

function Private({ children }) {
  return (
    <ProtectedRoute>
      <MainLayout>{children}</MainLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Private><Dashboard /></Private>} />
          <Route path="/home" element={<Private><Home /></Private>} />
          <Route path="/friends" element={<Private><Friends /></Private>} />
          <Route path="/events" element={<Private><Events /></Private>} />
          <Route path="/chat" element={<Private><Chat /></Private>} />
          <Route path="/notifications" element={<Private><Notifications /></Private>} />
          <Route path="/qr-network" element={<Private><QRNetwork /></Private>} />
          <Route path="/qr" element={<Private><QRNetwork /></Private>} />
          <Route path="/ai" element={<Private><AI /></Private>} />
          <Route path="/assistant" element={<Private><AIAssistant /></Private>} />
          <Route path="/settings" element={<Private><Settings /></Private>} />
          <Route path="/profile" element={<Private><Profile /></Private>} />
          <Route path="/interests" element={<Private><Interests /></Private>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
