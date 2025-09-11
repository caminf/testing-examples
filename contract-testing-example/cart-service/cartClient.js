const axios = require("axios");

async function getProduct(baseUrl, id) {
  const response = await axios.get(`${baseUrl}/products/${id}`);
  return response.data;
}

module.exports = { getProduct };
