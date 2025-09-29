import { describe, it, expect } from "bun:test";
import fc from "fast-check";
import { sum } from "../src/sum";

describe("sum()", () => {
  it("is commutative", () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a: number, b: number) => sum(a, b) === sum(b, a))
    );
  });

  it("has 0 as neutral element", () => {
    fc.assert(
      fc.property(fc.integer(), (a) => sum(a, 0) === a)
    );
  });
});
