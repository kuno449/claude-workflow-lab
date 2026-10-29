import { describe, expect, it } from "vitest";
import { grossProfit, sellingPrice, suggestPrice } from "./pricing";

describe("suggestPrice", () => {
  it("相場より安ければ値下げしない", () => {
    expect(suggestPrice(1_000_000, 1_200_000, 90)).toBe(1_000_000);
  });
  it("60日以上掲載していれば相場まで下げる", () => {
    expect(suggestPrice(1_300_000, 1_200_000, 60)).toBe(1_200_000);
  });
  it("提案額は相場を下回らない", () => {
    expect(suggestPrice(1_300_000, 1_200_000, 120)).toBeGreaterThanOrEqual(
      1_200_000,
    );
  });
});

describe("sellingPrice", () => {
  it("仕入れ価格に利益率を上乗せする", () => {
    expect(sellingPrice(1_000_000, 0.2)).toBe(1_200_000);
  });
  it("1000円単位で切り上げる", () => {
    expect(sellingPrice(1_000_001, 0.2)).toBe(1_201_000);
  });
  it("利益率0なら仕入れ価格のまま", () => {
    expect(sellingPrice(500_000, 0)).toBe(500_000);
  });
  it("不正な入力はエラーになる", () => {
    expect(() => sellingPrice(0, 0.2)).toThrow();
    expect(() => sellingPrice(1000.5, 0.2)).toThrow();
    expect(() => sellingPrice(1_000_000, -0.1)).toThrow();
  });
});

describe("grossProfit", () => {
  it("販売価格から仕入れ価格を引いた粗利を返す", () => {
    expect(grossProfit(1_200_000, 1_000_000)).toBe(200_000);
  });
  it("赤字ならマイナスを返す", () => {
    expect(grossProfit(900_000, 1_000_000)).toBe(-100_000);
  });
  it("整数でない金額はエラーになる", () => {
    expect(() => grossProfit(1000.5, 1000)).toThrow();
  });
});
