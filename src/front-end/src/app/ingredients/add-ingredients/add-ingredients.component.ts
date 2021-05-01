import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-add-ingredients',
  templateUrl: './add-ingredients.component.html',
  styleUrls: ['./add-ingredients.component.css'],
})
export class AddIngredientsComponent implements OnInit {
  private modo: string = 'add';
  private idIngredient: string;
  public ingredient: Ingredient;

  constructor(
    public ingredientService: IngredientService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idIngredient')) {
        this.modo = 'edit';
        this.idIngredient = paramMap.get('idIngredient');
        this.ingredientService
          .getIngredient(this.idIngredient)
          .subscribe((dataIngre) => {
            this.ingredient = {
              id: dataIngre._id,
              ingredient: dataIngre.ingredient,
              quantity: dataIngre.quantity,
              measurement: dataIngre.measurement,
              measurementUnit: dataIngre.measurementUnit,
              expirationDate: dataIngre.expirationDate,
              price: dataIngre.price,
            };
          });
      } else {
        this.modo = 'add';
        this.idIngredient = null;
      }
    });
  }

  onAddIngredient(form: NgForm) {
    console.log('Adding...');

    const ingredient: Ingredient = {
      id: null,
      ingredient: form.value.ingredient,
      quantity: form.value.quantity,
      measurement: form.value.measurement,
      measurementUnit: form.value.measurementUnit,
      expirationDate: form.value.expirationDate,
      price: form.value.price,
    };

    this.ingredientService.addIngredient(ingredient);
    form.resetForm();
  }
}
