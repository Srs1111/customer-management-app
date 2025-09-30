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
    department: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    pincode: "",
  });

  //Mutltiple addresse state
  const [addresses, setAddresses] = useState([]);
  const addAddressRow = () => {
    setAddresses((prev) => [
      ...prev,
      { street: "", city: "", state: "", pincode: "" },
    ]);
  };

  useEffect(() => {
    if (!isEdit) return;
    fetch(`http://localhost:5000/api/customers/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.error(err));

    fetch(`http://localhost:5000/api/customers/${id}/addresses`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed To fetch addresses: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAddresses(
            data.length
              ? data
              : [{ street: "", city: "", state: "", pincode: "" }]
          );
        } else if (Array.isArray(data.addresses)) {
          setAddresses(
            data.addresses.length
              ? data.addresses
              : [{ street: "", city: "", state: "", pincode: "" }]
          );
        } else {
          setAddresses([{ street: "", city: "", state: "", pincode: "" }]);
        }
      })

      .catch((err) => console.error(err));
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //handle addresses change
  const handleAddressesChange = (index, e) => {
    const newAddresses = [...addresses];
    newAddresses[index][e.target.name] = e.target.value;
    setAddresses(newAddresses);
  };

  //Remove Addresses

  const removeAddresses = (index) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
  };

  //submit customer + address

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://localhost:5000/api/customers/${id}`
      : "http://localhost:5000/api/customers";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const customerData = await res.json();

    const customerId = isEdit ? id : customerData.id;
    for (let address of addresses) {
      console.log("Submitting address:", address);
      const response = await fetch(
        `http://localhost:5000/api/customers/${customerId}/addresses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(address),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("failed to submit address:", errorData);
        alert(`Failed to submit address: ${errorData.error}`);
        return;
      }
    }

    //Reset Address after adding
    setAddresses([{ street: "", city: "", state: "", pincode: "" }]);

    navigate("/customers");
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
          placeholder="Last Name"
          required
        />
        <input
          name="department"
          value={form.department || ""}
          onChange={handleChange}
          placeholder="Department"
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

        <h1>Addresses</h1>
        {addresses.length > 0 &&
          addresses.map((address, index) => (
            <div key={index} className="address-card">
              <input
                name="street"
                value={address.street}
                onChange={(e) => handleAddressesChange(index, e)}
                placeholder="Street"
              />
              <input
                name="city"
                value={address.city}
                onChange={(e) => handleAddressesChange(index, e)}
                placeholder="City"
              />
              <input
                name="state"
                value={address.state}
                onChange={(e) => handleAddressesChange(index, e)}
                placeholder="State"
              />
              <input
                name="pincode"
                value={address.pincode}
                onChange={(e) => handleAddressesChange(index, e)}
                placeholder="pincode"
              />
              <button
                className="remove-btn"
                type="button"
                onClick={() => removeAddresses(index)}
              >
                Remove
              </button>
            </div>
          ))}
        <div className="btn-container">
          <button type="button" onClick={addAddressRow} className="another-btn">
            Add Another Address
          </button>
        </div>

        <button className="form-btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default CustomerFormPage;
