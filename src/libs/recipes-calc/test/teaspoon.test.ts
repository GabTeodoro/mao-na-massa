import { Unit } from "../src/basicUnit";
import { Teaspoon } from "../src/units";

describe("Testes de retorno do valor base das unidades para Teaspoon", () => {
    const teaspoon = new Teaspoon();

    test("Teste para o valor base de Teaspoon para AmericanCup", () => {
        expect(teaspoon.getBaseValueBy(Unit.AmericanCup)).toBeCloseTo(48.6922); //received 48.
    });

    test("Teste para o valor base de Teaspoon para Liter", () => {
        expect(teaspoon.getBaseValueBy(Unit.Liter)).toBe(202.884);
    });

    test("Teste para o valor base de Teaspoon para Mililiter", () => {
        expect(teaspoon.getBaseValueBy(Unit.Mililiter)).toBe(0.2028);
    });

    test("Teste para o valor base de Teaspoon para LiquidAmericanOunce", () => {
        expect(teaspoon.getBaseValueBy(Unit.LiquidAmericanOunce)).toBe(6);
    });

    test("Teste para o valor base de Teaspoon para AmericanTablespoon", () => {
        expect(teaspoon.getBaseValueBy(Unit.AmericanTablespoon)).toBe(3);
    });

    test("Teste para o valor base de teaspoon para AmericanTeaspoon", () => {
        expect(teaspoon.getBaseValueBy(Unit.AmericanTeaspoon)).toBe(1);
    });
});

describe("Teste de conversão de unidade para Teaspoon", () => {
    const teaspoon = new Teaspoon();

    test("10 Teaspoon para AmericanCup", () => {
        expect(teaspoon.unitConverter(Unit.AmericanCup, 10)).toBeCloseTo(486.922); //received 480.
    })
    test("10 Liter para Teaspoon", () => {
        expect(teaspoon.unitConverter(Unit.Liter, 10)).toBeCloseTo(2028.84);
    })
    test("10 Mililiter para Teaspoon", () => {
        expect(teaspoon.unitConverter(Unit.Mililiter, 10)).toBeCloseTo(2.028);
    })
    test("10 LiquidAmericanOunce para Teaspoon", () => {
        expect(teaspoon.unitConverter(Unit.LiquidAmericanOunce, 10)).toBeCloseTo(60);
    })
    test("10 AmericanTablespoon para Teaspoon", ()=> {
        expect(teaspoon.unitConverter(Unit.AmericanTablespoon, 10)).toBeCloseTo(30);
    })
    test("10 AmericanTeaspoon para Teaspoon", ()=> {
        expect(teaspoon.unitConverter(Unit.AmericanTeaspoon, 10)).toBeCloseTo(10);
    })
})