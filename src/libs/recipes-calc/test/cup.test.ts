import { Unit } from "../src/basicUnit";
import { Cup } from "../src/units";

describe("Testes de retorno do valor base das unidades para Copo", () => {
    const cup = new Cup();

    test("Teste para o valor base de Cup para Liter", () => {
        expect(cup.getBaseValueBy(Unit.Liter)).toBe(4.23);
    });

    test("Teste para o valor base de Cup para Mililiter", () => {
        expect(cup.getBaseValueBy(Unit.Mililiter)).toBe(0.00423);
    });

    test("Teste para o valor base de Cup para Liquid American Ounce", () => {
        expect(cup.getBaseValueBy(Unit.LiquidAmericanOunce)).toBe(0.123);
    });

    test("Teste para o valor base de Cup para American Tablespoon", () => {
        expect(cup.getBaseValueBy(Unit.AmericanTablespoon)).toBe(0.047);
    });

    test("Teste para o valor base de cup para American Teaspoon", () => {
        expect(cup.getBaseValueBy(Unit.AmericanTeaspoon)).toBe(0.24);
    });
});

describe("Teste de conversão de unidade para Cup", () => {
    const cup = new Cup();

    test("10 Liter para Cup", () => {
        expect(cup.unitConverter(Unit.Liter, 10)).toBe(42.3);
    })
    test("10 Mililiter para Cup", () => {
        expect(cup.unitConverter(Unit.Mililiter, 10)).toBe(0.0423);
    })
    test("10 Liquid American Ounce para cup", () => {
        expect(cup.unitConverter(Unit.LiquidAmericanOunce, 10)).toBe(1.23);
    })
    test("10 Tablespoon para cup", ()=> {
        expect(cup.unitConverter(Unit.AmericanTablespoon, 10)).toBe(0.47);
    })
    test("10 Teaspoon para cup", ()=> {
        expect(cup.unitConverter(Unit.AmericanTeaspoon, 10)).toBe(2.4);
    })
})