export function suggestPrice(
  price: number,
  marketPrice: number,
  daysListed: number,
): number {
  if (price <= 0 || marketPrice <= 0)
    throw new Error("価格は正の数で指定してください");
  const gap = price - marketPrice;
  const pressure = Math.min(daysListed / 60, 1);
  const suggested = price - Math.max(gap, 0) * pressure;
  return Math.round(suggested / 1000) * 1000;
}

export function sellingPrice(cost: number, markupRate: number): number {
  if (!Number.isInteger(cost) || cost <= 0)
    throw new Error("仕入れ価格は正の整数(円)で指定してください");
  if (markupRate < 0) throw new Error("利益率は0以上で指定してください");
  return Math.ceil((cost * (1 + markupRate)) / 1000) * 1000;
}

export function grossProfit(price: number, cost: number): number {
  if (!Number.isInteger(price) || !Number.isInteger(cost))
    throw new Error("金額は円単位の整数で指定してください");
  return price - cost;
}
