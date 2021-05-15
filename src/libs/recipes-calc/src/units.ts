import { Unit, BasicUnit } from "./basicUnit";

export class Cup implements BasicUnit {
    getBaseValueBy(unit: Unit): number {
        let value: number

        switch (unit) {
            case Unit.Gram:
            case Unit.Mililiter:
                value = 0.00423;
                break;
            case Unit.Kilogram:
            case Unit.Liter:
                value = 4.23;
                break;
            case Unit.LiquidAmericanOunce:
                value = 8.35;
                break;
            case Unit.AmericanTablespoon:
                value = 0.047; 
                break;                       
            case Unit.AmericanTeaspoon:
                value = 0.24;
                break;
            default:
                value = 0.00;
        }
        return value
    }

    unitConverter(unit: Unit, value: number): number {
        return this.getBaseValueBy(unit) * value;
    }

}

export class Gram implements BasicUnit {
    unitConverter(unit: Unit, value: number): number {
        return this.getBaseValueBy(unit) * value;
    }

    getBaseValueBy(unit: Unit): number {
        let value: number;

        switch (unit) {
            case Unit.AmericanCup:
                value = 236.59;
                break;
            case Unit.Kilogram:
            case Unit.Liter:
                value = 1000;
                break;
            case Unit.Mililiter:
                value = 1;
                break;
            case Unit.LiquidAmericanOunce:
                value = 0.035274;
                break;
            case Unit.AmericanTablespoon:
                value = 0.047; 
                break;                       
            case Unit.AmericanTeaspoon:
                value = 0.24;
                break;
            default:
                value = 0.00;
        }

        return value;
    }
}

export class Litter implements BasicUnit {
    getBaseValueBy(unit: Unit): number {
        let value: number;

        switch (unit) {
            case Unit.AmericanCup:
                value = 0.2841;
                break;
            case Unit.Kilogram:
            case Unit.Liter:
                value = 1;
                break;
            case Unit.Mililiter:
                value = 0.001;
                break;
            case Unit.LiquidAmericanOunce:
                value = 0.02957;
                break;
            case Unit.AmericanTablespoon:
                value = 0.014178; 
                break;                       
            case Unit.AmericanTeaspoon:
                value = 0.004928;
                break;
            default:
                value = 0.00;
        }

        return value;
    }

    unitConverter(unit: Unit, value: number): number {
        return this.getBaseValueBy(unit) * value;
    }

}

export class Ounce implements BasicUnit {
    getBaseValueBy(unit: Unit): number {
        let value: number;

        switch (unit) {
            case Unit.AmericanCup:
                value = 8.11;
                break;
            case Unit.Kilogram:
            case Unit.Liter:
                value = 33.81;
                break;
            case Unit.Mililiter:
                value = 0.033;
                break;
            case Unit.LiquidAmericanOunce:
                value = 1;
                break;
            case Unit.AmericanTablespoon:
                value = 0.5; 
                break;                       
            case Unit.AmericanTeaspoon:
                value = 0.16;
                break;
            default:
                value = 0.00;
        }
        return value;
    }

    unitConverter(unit: Unit, value: number): number {
        return this.getBaseValueBy(unit) * value;
    }

}

export class Tablespoon implements BasicUnit {
    getBaseValueBy(unit: Unit): number {
        let value: number;

        switch (unit) {
            case Unit.AmericanCup:
                value = 16;
                break;
            case Unit.Kilogram:
            case Unit.Liter:
                value = 67.628;
                break;
            case Unit.Mililiter:
                value = 0.067628;
                break;
            case Unit.LiquidAmericanOunce:
                value = 2;
                break;
            case Unit.AmericanTablespoon:
                value = 1; 
                break;                       
            case Unit.AmericanTeaspoon:
                value = 0.33333;
                break;
            default:
                value = 0.00;
        }

        return value;
    }

    unitConverter(unit: Unit, value: number): number {
        return this.getBaseValueBy(unit) * value;
    }
}

export class Teaspoon implements BasicUnit {
    getBaseValueBy(unit: Unit): number {
        let value: number;

        switch (unit) {
            case Unit.AmericanCup:
                value = 48;
                break;
            case Unit.Kilogram:
            case Unit.Liter:
                value = 202.884;
                break;
            case Unit.Mililiter:
                value = 0.2028;
                break;
            case Unit.LiquidAmericanOunce:
                value = 6;
                break;
            case Unit.AmericanTablespoon:
                value = 3; 
                break;                       
            case Unit.AmericanTeaspoon:
                value = 1;
                break;
            default:
                value = 0.00;
        }

        return value;
    }

    unitConverter(unit: Unit, value: number): number {
        return this.getBaseValueBy(unit) * value;
    }

}