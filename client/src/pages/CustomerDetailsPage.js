import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./CustomerDetailPage.css";

function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/customers/${id}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="detail-page-container">
      <h1 className="detail-page-heading">Customer Details</h1>
      <div className="customer-card">
        <p className="customer-name">
          {customer.firstName} {customer.lastName}
        </p>
        <p>Phone: {customer.phone}</p>
        <p>Email: {customer.email}</p>
        <p>City: {customer.city}</p>
        <p>State: {customer.state}</p>
        <p>Pincode: {customer.pincode}</p>
      </div>
      <button
        onClick={() => navigate(`/customers/${id}/edit`)}
        className="edit-btn"
      >
        Edit
      </button>
    </div>
  );
}

export default CustomerDetailPage;
