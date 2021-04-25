import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    this.ingredientService.addIngredient(
      form.value.ingredient,
      form.value.quantity,
      form.value.measurement,
      form.value.measurementUnit,
      form.value.expirationDate,
      form.value.price
    );
    form.resetForm();
  }
}
