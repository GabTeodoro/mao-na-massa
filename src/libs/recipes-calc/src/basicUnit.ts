export enum Unit {
    AmericanCup,
    Gram,
    Kilogram,
    Liter,
    Mililiter,
    LiquidAmericanOunce,
    AmericanTablespoon,
    AmericanTeaspoon,
}

export enum UnitSufix {
    Cup = "cup",
    Gram = "g",
    Kilogram = "kg"
}

export interface BasicUnit {
    getBaseValueBy(unit: Unit): number;
    unitConverter(unit: Unit, value: number): number;
}
