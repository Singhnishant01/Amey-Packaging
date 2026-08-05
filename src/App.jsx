import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

// Admin Pages
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import AddProduct from "./admin/pages/AddProduct";
import Enquiries from "./admin/pages/Enquiries";

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
        path="/admin/add-product"
        element={
          <ProtectedRoute>
            <AddProduct />
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
    </Routes>
  );
}

export default App;