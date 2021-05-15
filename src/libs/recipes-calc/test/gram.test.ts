import { Unit } from "../src/basicUnit";
import { Gram } from "../src/units";

describe("Testes de retorno do valor base das unidade para Grama", () => {
    const gram = new Gram();

    test("Teste para o valor base de grama para LiquidAmericanOunce", () => {
        expect(gram.getBaseValueBy(Unit.LiquidAmericanOunce)).toBe(0.035274);
    });

    test("Teste para o valor base de grama para Mililiter", () => {
        expect(gram.getBaseValueBy(Unit.Mililiter)).toBe(1);
    });

    test("Teste para o valor base de grama para Liter", () => {
        expect(gram.getBaseValueBy(Unit.Liter)).toBe(1000);
    });

    test("Teste para o valor base de grama para AmericanCup", () => {
        expect(gram.getBaseValueBy(Unit.AmericanCup)).toBe(236.59);
    });

    test("Teste para o valor base de grama para Tablespoon", () => {
        expect(gram.getBaseValueBy(Unit.AmericanTablespoon)).toBe(0.047);
    });

    test("Teste para o valor base de grama para Teaspoon", () => {
        expect(gram.getBaseValueBy(Unit.AmericanTeaspoon)).toBe(0.24);
    });
});

describe("Testes de conversâo de unidade para Grama", () => {
    const gram = new Gram();

    test("10 AmericanTeaspoon para gramas", () => {
        expect(gram.unitConverter(Unit.AmericanTeaspoon, 10)).toBe(2.4);
    });

    test("10 LiquidAmericanOunce para gramas", () => {
        expect(gram.unitConverter(Unit.LiquidAmericanOunce, 10)).toBe(0.35274);
    });

    test("10 Mililiter para gramas", () => {
        expect(gram.unitConverter(Unit.Mililiter, 10)).toBe(10);
    });

    test("10 Liter para gramas", () => {
        expect(gram.unitConverter(Unit.Liter, 10)).toBe(10000);
    });

    test("10 AmericanCup para gramas", () => {
        expect(gram.unitConverter(Unit.AmericanCup, 10)).toBe(2365.9);
    });

    test("10 Tablespoon para gramas", () => {
        expect(gram.unitConverter(Unit.AmericanTablespoon, 10)).toBe(0.47);
    });
});
