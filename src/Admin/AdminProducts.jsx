import React, { useState, useContext } from "react";
import { ShopContext } from "../components/Context/ShopContext";
import "./Admin.css";

const AdminProducts = () => {
  const { refreshProducts } = useContext(ShopContext);

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("adminProducts");

    if (savedProducts) {
      return JSON.parse(savedProducts);
    }

    return [];
  });

  const [name, setName] = useState("");
  const [category, setCategory] = useState("men");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const addProduct = (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Please enter product name and price");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      category,
      price: Number(price),
      discount: Number(discount) || 0,
    };

    const updatedProducts = [...products, newProduct];

    setProducts(updatedProducts);

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    refreshProducts();

    setName("");
    setPrice("");
    setDiscount("");

    alert("Product added successfully");
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    refreshProducts();
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Products</h1>
          <p>Add and manage your products</p>
        </div>
      </div>

      <div className="admin-form-card">
        <h2>Add New Product</h2>

        <form onSubmit={addProduct} className="product-form">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kids</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />

          <button type="submit">Add Product</button>
        </form>
      </div>

      <div className="admin-table-card">
        <h2>Product List</h2>

        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>{product.discount}%</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;