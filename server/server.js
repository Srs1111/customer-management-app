const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

const PORT = 5000;

const customerRoutes = require("./routes/customerRoutes");

const addressRoutes = require("./routes/addressesRoutes");

//Middleware

app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/api/customers", customerRoutes);
app.use("/api", addressRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
