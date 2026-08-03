import { useEffect, useState } from "react";
import {
  addProduct,
  updateProduct,
} from "../services/productService";
import "./Products.css";

function AddProduct({
  refreshProducts,
  editingProduct,
  setEditingProduct,
  setShowAddProduct,
}) {
  const initialForm = {
    name: "",
    category: "",
    description: "",
    features: "",
    applications: "",
  };

  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Fill form while editing
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        category: editingProduct.category || "",
        description: editingProduct.description || "",
        features: editingProduct.features
          ? editingProduct.features.join(", ")
          : "",
        applications: editingProduct.applications
          ? editingProduct.applications.join(", ")
          : "",
      });

      if (editingProduct.image) {
        if (editingProduct.image.startsWith("/uploads")) {
          setPreview(
            `http://localhost:5000${editingProduct.image}`
          );
        } else {
          setPreview(editingProduct.image);
        }
      }
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setForm(initialForm);
    setImage(null);
    setPreview("");
  };

  // Handle text inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);

      formData.append(
        "features",
        JSON.stringify(
          form.features
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );

      formData.append(
        "applications",
        JSON.stringify(
          form.applications
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );

      if (image) {
        formData.append("image", image);
      }

      if (editingProduct) {
        await updateProduct(
          editingProduct._id,
          formData
        );

        alert("✅ Product Updated Successfully");
      } else {
        await addProduct(formData);

        alert("✅ Product Added Successfully");
      }

      if (refreshProducts) {
        await refreshProducts();
      }

      resetForm();

      if (setEditingProduct) {
        setEditingProduct(null);
      }

      if (setShowAddProduct) {
        setShowAddProduct(false);
      }

    } catch (err) {
      console.error(err);
      alert("❌ Unable to save product");
    }
  };

  return (
    <div className="admin-products">

      <h2>
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="features"
          placeholder="Reusable, Eco Friendly, Premium Quality"
          value={form.features}
          onChange={handleChange}
        />

        <input
          type="text"
          name="applications"
          placeholder="Retail, Shopping, Packaging"
          value={form.applications}
          onChange={handleChange}
        />

        <label
          style={{
            fontWeight: "600",
            marginTop: "15px",
          }}
        >
          Product Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {preview && (
          <div
            style={{
              margin: "20px 0",
            }}
          >
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        )}

        <button
          type="submit"
          className="add-btn"
        >
          {editingProduct
            ? "Update Product"
            : "Save Product"}
        </button>

      </form>

    </div>
  );
}

export default AddProduct;