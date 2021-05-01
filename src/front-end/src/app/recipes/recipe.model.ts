import { Ingredient } from "../ingredients/ingredient.model";

export interface Recipe {
  id: string,
  lines:Ingredient[],
  minimumValue: number,
  priceSuggestion: number,
  productionDate: string,
  profitPercentage: number,
  finalPrice: number,
  name: string
}
