const path = require("path");
const { Verifier } = require("@pact-foundation/pact");
const app = require("./server");

let server;

beforeAll((done) => {
  server = app.listen(8081, done);
});

afterAll(() => {
  server.close();
});

test("verifica contrato pact", () => {
  return new Verifier({
    provider: "CatalogService",
    providerBaseUrl: "http://localhost:8081",
    pactUrls: [path.resolve(__dirname, "../cart-service/pacts/cartservice-catalogservice.json")]
  }).verifyProvider();
});
