import { Unit } from "../src/basicUnit";
import { Liter } from "../src/units";

describe("Testes de retorno do valor base das unidades para Liter", () => {
    const liter = new Liter();

    test("Teste para o valor base de Liter para AmericanCup", () => {
        expect(liter.getBaseValueBy(Unit.AmericanCup)).toBe(0.2841);
    });

    test("Teste para o valor base de Liter para Mililiter", () => {
        expect(liter.getBaseValueBy(Unit.Mililiter)).toBe(0.001);
    });

    test("Teste para o valor base de Liter para LiquidAmericanOunce", () => {
        expect(liter.getBaseValueBy(Unit.LiquidAmericanOunce)).toBe(0.02957);
    });

    test("Teste para o valor base de Liter para AmericanTablespoon", () => {
        expect(liter.getBaseValueBy(Unit.AmericanTablespoon)).toBe(0.014178);
    });

    test("Teste para o valor base de liter para AmericanTeaspoon", () => {
        expect(liter.getBaseValueBy(Unit.AmericanTeaspoon)).toBe(0.004928);
    });
});

describe("Teste de conversão de unidade para Liter", () => {
    const liter = new Liter();

    test("10 Liter para AmericanCup", () => {
        expect(liter.unitConverter(Unit.AmericanCup, 10)).toBeCloseTo(2.841);
    })
    test("10 Mililiter para Liter", () => {
        expect(liter.unitConverter(Unit.Mililiter, 10)).toBeCloseTo(0.010);
    })
    test("10 LiquidAmericanOunce para Liter", () => {
        expect(liter.unitConverter(Unit.LiquidAmericanOunce, 10)).toBeCloseTo(0.2957);
    })
    test("10 AmericanTablespoon para Liter", ()=> {
        expect(liter.unitConverter(Unit.AmericanTablespoon, 10)).toBeCloseTo(0.14178);
    })
    test("10 AmericanTeaspoon para Liter", ()=> {
        expect(liter.unitConverter(Unit.AmericanTeaspoon, 10)).toBeCloseTo(0.04928);
    })
})