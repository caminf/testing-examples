Feature: Proceso de compra en la tienda en línea

Scenario: Comprar productos y verificar el total
Given un carrito vacío
And el usuario añade 2 unidades de producto con ID 1
And el usuario añade 1 unidades de producto con ID 2
When el usuario realiza la compra
Then la compra debe ser exitosa y el total debe ser 130