
export interface RecipeLine {
  id: string,
  ingredientId: string,
  quantityIngredient:number,
  total: number
}

export interface Recipe {
  id: string,
  lines:RecipeLine[],
  minimumValue: number,
  priceSuggestion: number,
  productionDate: string,
  profitPercentage: number,
  finalPrice: number,
  name: string
}
