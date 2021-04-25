import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-add-ingredients',
  templateUrl: './add-ingredients.component.html',
  styleUrls: ['./add-ingredients.component.css'],
})
export class AddIngredientsComponent {
  constructor(public ingredientService: IngredientService) {}

  onAddIngredient(form: NgForm) {
    console.log('Inserindo...');

    const ingredient: Ingredient = {
      id: null,
      ingredient: form.value.ingredient,
      quantity: form.value.quantity,
      measurement: form.value.measurement,
      measurementUnit: form.value.measurementUnit,
      expirationDate: form.value.expirationDate,
      price: form.value.price,
    }

    this.ingredientService.addIngredient(ingredient);
    form.resetForm();
  }
}
