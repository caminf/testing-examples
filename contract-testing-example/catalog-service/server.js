const express = require("express");
const app = express();

app.get("/products/:id", (req, res) => {
  const products = {
    101: { id: 101, name: "Laptop", price: 1200.5 },
    102: { id: 102, name: "Mouse", price: 25.0 }
  };
  const product = products[req.params.id];
  if (product) res.json(product);
  else res.status(404).json({ error: "Not found" });
});

if (require.main === module) {
  app.listen(8081, () => console.log("Catalog Service on port 8081"));
}

module.exports = app;
