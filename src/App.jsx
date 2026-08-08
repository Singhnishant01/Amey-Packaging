import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

// Admin
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Settings from "./admin/pages/Settings";
import Enquiries from "./admin/pages/Enquiries";
import Profile from "./admin/pages/Profile";

import ProtectedRoute from "./admin/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Website */}
      <Route path="/" element={<Home />} />

      {/* Admin */}
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/enquiries"
        element={
          <ProtectedRoute>
            <Enquiries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;