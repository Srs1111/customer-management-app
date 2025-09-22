import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import "./CustomerFormPage.css";

function CustomerFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (!isEdit) return;
    fetch(`http://localhost:5000/api/customers/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.error(err));
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://localhost:5000/api/customers/${id}`
      : "http://localhost:5000/api/customers";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => navigate("/customers"));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>{isEdit ? "Edit Customer" : "New Customer"}</h1>
        <input
          name="firstName"
          value={form.firstName || ""}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          name="lastName"
          value={form.lastName || ""}
          onChange={handleChange}
          placeholder="last Name"
          required
        />

        <input
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          required
        />

        <input
          name="email"
          value={form.email || ""}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="city"
          value={form.city || ""}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          name="state"
          value={form.state || ""}
          onChange={handleChange}
          placeholder="State"
        />
        <input
          name="pincode"
          value={form.pincode || ""}
          onChange={handleChange}
          placeholder="Pincode"
        />
        <button className="form-btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default CustomerFormPage;
