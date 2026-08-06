import { useEffect, useState } from "react";
import {
  addProduct,
  updateProduct,
} from "../services/productService";

function ProductModal({
  open,
  onClose,
  onSuccess,
  editingProduct,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        category: editingProduct.category || "",
        price: editingProduct.price || "",
        description: editingProduct.description || "",
      });
    } else {
      setForm({
        name: "",
        category: "",
        price: "",
        description: "",
      });

      setImage(null);
    }
  }, [editingProduct]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append(
        "description",
        form.description
      );

      if (image) {
        formData.append("image", image);
      }

      if (editingProduct) {
        await updateProduct(
          editingProduct._id,
          formData
        );
      } else {
        await addProduct(formData);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Unable to save product.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "650px",
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        <h2>
          {editingProduct
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{
            ...inputStyle,
            minHeight: "120px",
          }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px",
            marginTop: "25px",
          }}
        >
          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button type="submit">
            {loading
              ? "Saving..."
              : editingProduct
              ? "Update"
              : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

export default ProductModal;