const { Given, When, Then } = require('@cucumber/cucumber');
const shoppingService = require('../../src/services/shoppingService');
const assert = require('assert');


Given('un carrito vacío', function () {
    this.cart = [];
});
/*
Given('el usuario añade {int} unidades de producto con ID {int}', function (cart, productId, quantity = 1) {
const product = findProductById(productId);
if (!product) {
throw new Error('Producto no encontrado');
}
// Añadir al carrito (array de objetos)
const existingItem = cart.find(item => item.product.id === productId);
if (existingItem) {
existingItem.quantity += quantity;
} else {
cart.push({ product, quantity });
}
return cart;
}
*/
Given('el usuario añade {int} unidades de producto con ID {int}', function (quantity, productId) {
    this.cart = shoppingService.addToCart(this.cart, productId, quantity);
});

When('el usuario realiza la compra', function () {
    this.purchaseResult = shoppingService.checkout(this.cart);
});

Then('la compra debe ser exitosa y el total debe ser {int}', function (expectedTotal) {
    assert.strictEqual(this.purchaseResult.success, true);
    assert.strictEqual(this.purchaseResult.totalAmount, expectedTotal);
});