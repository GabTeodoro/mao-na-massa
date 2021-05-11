import { Unit } from "../src/basicUnit";
import { Gram } from "./units";

describe("Testes de retorno do valor base das unidade para Grama", () => {
    const gram = new Gram();

    test("Teste para o valor base de grama para Tablespoon", () => {
        expect(gram.getBaseValueBy(Unit.AmericanTablespoon)).toBe(0.047);
    });

    test("Teste para o valor base de grama para Teaspoon", () => {
        expect(gram.getBaseValueBy(Unit.AmericanTeaspoon)).toBe(0.24);
    });
});

describe("Testes de conversâo de unidade para Grama", () => {
    const gram = new Gram();

    test("10 Tablespoon para gramas", () => {
        expect(gram.unitConverter(Unit.AmericanTablespoon, 10)).toBe(0.48);
    });
});
