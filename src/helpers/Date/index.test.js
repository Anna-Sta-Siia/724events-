import { getMonth } from ".";

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("should return 'janvier' for 2022-01-01", () => {
      const date = new Date("2022-01-01");
      expect(getMonth(date)).toBe("janvier");
    });

    it("should return 'juillet' for 2022-07-08", () => {
      const date = new Date("2022-07-08");
      expect(getMonth(date)).toBe("juillet");
    });

    // cas d’erreur
    it("should return undefined for an invalid date", () => {
      const bad = new Date("pas une date");
      expect(getMonth(bad)).toBeUndefined(); 
    });
  });
});

