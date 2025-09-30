const db = require("../models/db");

exports.createCustomer = (req, res) => {
  const {
    firstName,
    lastName,
    department,
    phone,
    email,
    city,
    state,
    pincode,
  } = req.body;
  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ error: "Require Field missing" });
  }

  db.run(
    `INSERT INTO customers (firstName, lastName, department, phone, email, city, state, pincode)
    VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
    [firstName, lastName, department, phone, email, city, state, pincode],

    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: "Customer created Successfully" });
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

    (err, customer) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!customer)
        return res.status(404).json({ error: "Customer Not Found" });

      db.all(
        "SELECT * FROM  addresses WHERE customerId = ?",
        [id],
        (err, addresses) => {
          if (err) {
            console.error("DB error fetching address", err);
            return res.status(500).json({ error: err.message });
          }
          res.json({
            ...customer,
            addresses: addresses || [],
          });
        }
      );
    }
  );
};

exports.updateCustomer = (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    department,
    email,
    phone,
    city,
    state,
    pincode,
  } = req.body;

  db.run(
    `UPDATE customers SET firstName = ?, lastName= ?, email = ?, department = ?, phone = ?, city = ?, state = ?, pincode = ?  WHERE id  = ?`,
    [firstName, lastName, email, department, phone, city, state, pincode, id],
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

  db.run(`DELETE  FROM addresses WHERE customerId =?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    db.run("DELETE FROM customers WHERE id = ?", [id], function (err2) {
      if (err2) return res.status(500).json({ err2: message });

      if (this.changes === 0) {
        return res.status(404).json({ error: "Customer Not Found" });
      }
      res.json({
        message: "Customer and related addresses deleted Successfully",
      });
    });
  });
};
