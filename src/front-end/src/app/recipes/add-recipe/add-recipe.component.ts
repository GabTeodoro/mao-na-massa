import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  sliderValue: number = 50;
  rowQuantity: number = 1;
  formatLabel(value: number) {
    this.sliderValue = value;
    return value + '%';
  }
  add(){
    this.rowQuantity++;
    console.log(this.rowQuantity)
  }
  delete(){
    if (this.rowQuantity > 1){
      this.rowQuantity--;
      console.log(this.rowQuantity)
    }
  }

  onAddRecipe(form:NgForm){
    const recipe:Recipe = {
      id: null,
      name: form.value.name,
      lines:[{
        id: null,
        ingredient:form.value.ingredient,
        quantity: form.value.quantity,
        measurement: form.value.measurement,
        measurementUnit: form.value.measurementUnit,
        expirationDate: form.value.expirationDate,
        price: form.value.price,
      }],
      minimumValue: form.value.minimumValue,
      priceSuggestion: form.value.priceSuggestion,
      productionDate: form.value.productionDate,
      profitPercentage: form.value.profitPercentage,
      finalPrice: form.value.finalPrice
    }

    this.recipeService.addRecipe(recipe)
  }
  constructor(public recipeService: RecipeService) { }

  ngOnInit(): void {

  }

}
