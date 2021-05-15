import { Unit } from "../src/basicUnit";
import { Tablespoon } from "../src/units";

describe("Testes de retorno do valor base das unidades para Tablespoon", () => {
    const tablespoon = new Tablespoon();

    test("Teste para o valor base de Tablespoon para AmericanCup", () => {
        expect(tablespoon.getBaseValueBy(Unit.AmericanCup)).toBe(16);
    });

    test("Teste para o valor base de Tablespoon para Liter", () => {
        expect(tablespoon.getBaseValueBy(Unit.Liter)).toBe(67.628);
    });

    test("Teste para o valor base de Tablespoon para Mililiter", () => {
        expect(tablespoon.getBaseValueBy(Unit.Mililiter)).toBe(0.067628);
    });

    test("Teste para o valor base de Tablespoon para LiquidAmericanOunce", () => {
        expect(tablespoon.getBaseValueBy(Unit.LiquidAmericanOunce)).toBe(2);
    });

    test("Teste para o valor base de tablespoon para AmericanTeaspoon", () => {
        expect(tablespoon.getBaseValueBy(Unit.AmericanTeaspoon)).toBe(0.33333);
    });
});

describe("Teste de conversão de unidade para Tablespoon", () => {
    const tablespoon = new Tablespoon();

    test("10 Tablespoon para AmericanCup", () => {
        expect(tablespoon.unitConverter(Unit.AmericanCup, 10)).toBeCloseTo(160);
    })
    test("10 Liter para Tablespoon", () => {
        expect(tablespoon.unitConverter(Unit.Liter, 10)).toBeCloseTo(676.28);
    })
    test("10 Mililiter para Tablespoon", () => {
        expect(tablespoon.unitConverter(Unit.Mililiter, 10)).toBeCloseTo(0.67628);
    })
    test("10 LiquidAmericanOunce para Tablespoon", () => {
        expect(tablespoon.unitConverter(Unit.LiquidAmericanOunce, 10)).toBeCloseTo(20);
    })
    test("10 AmericanTeaspoon para Tablespoon", ()=> {
        expect(tablespoon.unitConverter(Unit.AmericanTeaspoon, 10)).toBeCloseTo(3.3333);
    })
})