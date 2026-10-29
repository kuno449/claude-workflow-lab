import { describe, expect, it } from 'vitest';
import { suggestPrice } from './pricing';


describe('suggestPrice', () => {
    it('相場より安ければ値下げしない', () => {
        expect(suggestPrice(1_000_000, 1_200_000, 90)).toBe(1_000_000);
    });
    it('60日以上掲載していれば相場まで下げる', () => {
        expect(suggestPrice(1_300_000, 1_200_000, 60)).toBe(1_200_000);
    });
    it('提案額は相場を下回らない', () => {
        expect(suggestPrice(1_300_000, 1_200_000, 120)).toBeGreaterThanOrEqual(1_200_000);
    });
});