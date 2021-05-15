import { Unit } from "../src/basicUnit";
import { Ounce } from "../src/units";

describe("Testes de retorno do valor base das unidades para Onça", () => {
    const ounce = new Ounce();

    test("Teste para o valor base de onça para American Cup", () => {
        expect(ounce.getBaseValueBy(Unit.AmericanCup)).toBe(8.11);
    });

    test("Teste para o valor base de onça para Liter", () => {
        expect(ounce.getBaseValueBy(Unit.Liter)).toBe(33.81);
    });

    test("Teste para o valor base de onça para Mililiter", () => {
        expect(ounce.getBaseValueBy(Unit.Mililiter)).toBe(0.033);
    });

    test("Teste para o valor base de onça para Liquid American Ounce", () => {
        expect(ounce.getBaseValueBy(Unit.LiquidAmericanOunce)).toBe(1);
    });

    test("Teste para o valor base de onça para AmericanTablespoon", () => {
        expect(ounce.getBaseValueBy(Unit.AmericanTablespoon)).toBe(0.5);
    });

    test("Teste para o valor base de onça para AmericanTeaspoon", () => {
        expect(ounce.getBaseValueBy(Unit.AmericanTeaspoon)).toBe(0.16);
    });
});

describe("Teste de conversão de unidade para Onça", () => {
    const ounce = new Ounce();

    test("10 AmericanCup para onça", () => {
        expect(ounce.unitConverter(Unit.AmericanCup, 10)).toBe(81.1);
    })
    test("10 Liter para onça", () => {
        expect(ounce.unitConverter(Unit.Liter, 10)).toBe(338.1);
    })
    test("10 Mililiter para onça", () => {
        expect(ounce.unitConverter(Unit.Mililiter, 10)).toBe(0.33);
    })
    test("10 Liquid American Ounce para onça", () => {
        expect(ounce.unitConverter(Unit.LiquidAmericanOunce, 10)).toBe(10);
    })
    test("10 Tablespoon para onça", ()=> {
        expect(ounce.unitConverter(Unit.AmericanTablespoon, 10)).toBe(5);
    })
    test("10 Teaspoon para onça", ()=> {
        expect(ounce.unitConverter(Unit.AmericanTeaspoon, 10)).toBe(1.6);
    })
})