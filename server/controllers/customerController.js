const db = require("../models/db");

exports.createCustomer = (req, res) => {
  const { firstName, lastName, phone, email, city, state, pincode } = req.body;
  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ error: "Require Field missing" });
  }

  db.run(
    `INSERT INTO customers (firstName, lastName, phone, email, city, state, pincode)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, phone, email, city, state, pincode],

    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: "Customer created Succefully" });
    }
  );
};

exports.getAllCustomers = (req, res) => {
  let {
    search = "",
    sort = "id",
    order = "ASC",
    page = 1,
    limit = 10,
  } = req.query;
  const offset = (page - 1) * limit;

  const sql = `SELECT *FROM customers 
    WHERE firstName LIKE ?  OR lastName LIKE? OR city LIKE ? OR state LIKE? 
     ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;

  db.all(
    sql,
    [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, limit, offset],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
};

exports.getCustomerById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Customer ID Required" });
  }
  db.get(
    "SELECT * FROM  customers WHERE id = ?",
    [id],

    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: ":Customer Not Found" });
      res.json(row);
    }
  );
};

exports.updateCustomer = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, city, state, pincode } = req.body;

  db.run(
    `UPDATE customers SET firstName = ?, lastName= ?, email = ?, phone = ?, city = ?, state = ?, pincode = ?  WHERE id  = ?`,
    [firstName, lastName, email, phone, city, state, pincode, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ err: "Customer Not Found" });
      res.json({ message: "Customer Updated Successfuly" });
    }
  );
};

exports.deleteCustomer = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE * FROM customers WHERE id =?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (thgis.change === 0)
        return res.status(404).json({ error: "Customer Not Found" });
      res.json({ message: "Customer Deleted Successfully" });
    }
  );
};
