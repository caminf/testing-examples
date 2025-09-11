const path = require("path");
const { Pact } = require("@pact-foundation/pact");
const { getProduct } = require("./cartClient");

describe("Cart Service - Catalog Service contract", () => {
  const provider = new Pact({
    consumer: "CartService",
    provider: "CatalogService",
    port: 1234,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),  // <- Aquí se guarda el contrato
    logLevel: "INFO"
  });

  beforeAll(() => provider.setup());
  afterEach(() => provider.verify());   // <--- Agregado
  afterAll(() => provider.finalize());  // <--- Asegura escritura del contrato

  describe("cuando consulta un producto existente", () => {

    /* const productFixture = {
      id: like(101),               // espera un número
      name: like("Laptop"),        // espera un string
      price: like(1200.5)          // espera un número decimal
    }; */

    beforeAll(() =>
      provider.addInteraction({
        state: "un producto con id 101 existe",
        uponReceiving: "una solicitud GET a /products/101",
        withRequest: {
          method: "GET",
          path: "/products/101"
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json" },
          body: {
            id: 101,
            name: "Laptop",
            price: 1200.5
          }
          /* body: productFixture */  // <- Usando el fixture
        }
      })
    );

    it("recibe los datos esperados", async () => {
      const product = await getProduct("http://localhost:1234", 101);
      expect(product).toEqual({
        id: 101,
        name: "Laptop",
        price: 1200.5
      });
    });

    /* it("recibe los datos esperados con la estructura correcta", async () => {
      const product = await getProduct("http://localhost:1234", 101);
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(typeof product.id).toBe("number");
      expect(typeof product.name).toBe("string");
      expect(typeof product.price).toBe("number");
    }); */

  });
});
