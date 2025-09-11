// Simulamos una base de datos o API
const productsDB = [
{ id: 1, name: 'Zapatos', price: 50 },
{ id: 2, name: 'Camisa', price: 30 },
{ id: 3, name: 'Gorra', price: 20 },
];

// Función para buscar un producto por ID
function findProductById(productId) {
return productsDB.find(product => product.id === productId);
}

// Función para añadir un producto al carrito
function addToCart(cart, productId, quantity = 1) {
const product = findProductById(productId);
if (!product) {
throw new Error('Producto no encontrado');
}
// Añadir al carrito
const existingItem = cart.find(item => item.product.id === productId);
if (existingItem) {
existingItem.quantity += quantity;
} else {
cart.push({ product, quantity });
}
return cart;
}

// Simulación de proceso de pago
function checkout(cart) {
if (cart.length === 0) {
throw new Error('El carrito está vacío');
}
const totalAmount = cart.reduce((total, item) => {
return total + item.product.price * item.quantity;
}, 0);
// Simular una respuesta de una API de pago
return {
success: true,
message: 'Compra realizada con éxito',
totalAmount,
items: cart,
};
}

module.exports = {
findProductById,
addToCart,
checkout,
};