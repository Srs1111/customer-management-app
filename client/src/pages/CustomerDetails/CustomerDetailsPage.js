import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./CustomerDetailPage.css";

function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setAddresses([]);
    fetch(`http://localhost:5000/api/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data);
        setAddresses(data.addresses || []);
      })

      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed Delete");
      }
      navigate("/customers");
    } catch (err) {
      console.error("Error", err);
    }
  };

  return (
    <div className="detail-page-container">
      <h1 className="detail-page-heading">Customer Details</h1>
      <div className="customer-card">
        <p className="customer-name">
          {customer.firstName} {customer.lastName}
        </p>
        <p>Department: {customer.department}</p>
        <p>Phone: {customer.phone}</p>
        <p>Email: {customer.email}</p>
        <p>City: {customer.city}</p>
        <p>State: {customer.state}</p>
        <p>Pincode: {customer.pincode}</p>
      </div>

      <h1 className="address-heading">Addreeses</h1>
      {addresses.length > 0 ? (
        <ul className="address-box">
          {addresses.map((addr, index) => (
            <li key={index}>
              {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
            </li>
          ))}
        </ul>
      ) : (
        <p> No Addresses</p>
      )}

      <button
        onClick={() => navigate(`/customers/${id}/edit`)}
        className="edit-btn"
      >
        Edit
      </button>
      <button onClick={() => handleDelete(customer.id)} className="delete-btn">
        Delete Customer
      </button>
    </div>
  );
}

export default CustomerDetailPage;
