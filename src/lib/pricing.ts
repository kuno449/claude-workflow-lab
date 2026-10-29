export function suggestPrice(price: number, marketPrice: number, daysListed:number): number {
    if (price <= 0 || marketPrice <= 0) throw new Error('価格は正の数で指定してください');
    const gap = price - marketPrice;
    const pressure = Math.min(daysListed / 60, 1);
    const suggested = price - Math.max(gap, 0) * pressure;
    return Math.round(suggested / 1000) * 1000;
}