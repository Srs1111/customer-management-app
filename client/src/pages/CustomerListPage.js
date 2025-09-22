import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "./CustomerListPage.css";

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error("Error", err));
  }, []);

  //Filter Customer

  const filterCustomers = customers.filter((customer) => {
    const fullName =
      `${customer.firstName} ${customer.className}`.toLowerCase();
    const city = customer.city?.toLowerCase() || "";
    const state = customer.state?.toLowerCase() || "";
    const pincode = customer.pincode?.toString() || "";

    const search = searchTerm.toLowerCase();
    return (
      fullName.includes(search) ||
      city.includes(search) ||
      state.includes(search) ||
      pincode.includes(search)
    );
  });

  const handleReset = () => {
    setSearchTerm("");
  };

  return (
    <div className="customer-list-container">
      <h1 className="customer-list-heading">Customer List</h1>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name, city, state, pincode"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleReset} className="rest-btn">
          Reset
        </button>
      </div>

      <ul className="customer-list">
        {filterCustomers.length > 0 ? (
          filterCustomers.map((customer) => (
            <li key={customer.id} className="customer-item">
              <Link to={`/customers/${customer.id}`}>
                {customer.firstName} {customer.lastName} <br />
                <span className="cutomer-meta">{customer.city}</span>
              </Link>
            </li>
          ))
        ) : (
          <p className="no-result">No Customers Found.</p>
        )}
      </ul>
      <div>
        <button onClick={() => navigate("/customers/new")} className="add-btn">
          Add Customer
        </button>
      </div>
    </div>
  );
}

export default CustomerListPage;
