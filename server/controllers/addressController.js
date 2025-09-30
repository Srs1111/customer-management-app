const db = require("../models/db");

exports.createAddress = (req, res) => {
  console.log("Incoming body:", req.body);
  const { id } = req.params;
  const { street, city, state, pincode } = req.body;
  if (!street || !city || !state || !pincode) {
    console.log("Validation failed", street, city, state, pincode);
    return res.status(400).json({ error: "All Fields Are Required" });
  }

  db.run(
    `INSERT INTO  addresses (customerId, street, city, state, pincode)
        VALUES (?, ?, ?, ?, ?)
        `,
    [id, street, city, state, pincode],
    function (err) {
      if (err) return res.status(500).json({ err: err.message });
      res.json({ id: this.lastID, message: "Address Created Successfully" });
    }
  );
};

exports.getAddressByCustomer = (req, res) => {
  db.all(
    "SELECT * FROM addresses WHERE customerId =?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json({ err: err.message });
      res.json(rows);
    }
  );
};

exports.updateAddress = (req, res) => {
  const { id } = req.params;
  const { street, city, state, pincode } = req.body;

  db.run(
    `UPDATE addresses SET street = ?, city = ?, state = ?, pincode = ? WHERE id =?`,
    [street, city, state, pincode, id],
    function (err) {
      if (err) return res.status(500).json({ err: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Address Not Found" });
      res.json({ message: "Address Updated Successfully" });
    }
  );
};

exports.deleteAddress = (req, res) => {
  db.run(
    `DELETE FROM addresses WHERE id =?`,
    [req.params.addressId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Address not found" });
      res.json({ message: "Address Deleted Successfully" });
    }
  );
};
