import { HttpParams } from '@angular/common/http';
import { ViewChild } from '@angular/core';
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
  @ViewChild('ingredientForm') ingredientForm: NgForm;

  constructor(
    public ingredientService: IngredientService,
    public route: ActivatedRoute
  ) {}
  private paramValue: string;
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const url = window.location.href;
      if(url.includes('?')){
        const httpParams = new HttpParams({ fromString: url.split('?')[1] });
        this.paramValue = httpParams.get('idIngredient');
        if (this.paramValue){
          this.modo = 'edit';
          this.idIngredient = this.paramValue;
          this.ingredientService
          .getIngredient(this.idIngredient)
          .subscribe((dataIngre) => {
            this.ingredient = dataIngre.ingredients[0];
            const ing = {
              ingredient : this.ingredient.ingredient,
              quantity: this.ingredient.quantity,
              measurement: this.ingredient.measurement,
              measurementUnit: this.ingredient.measurementUnit,
              expirationDate: this.ingredient.expirationDate,
              price: this.ingredient.price,
            }
            this.ingredientForm.setValue(ing);
          });
        }
      }else{
        this.modo = 'add';
        this.idIngredient = null;
      }
    });
  }

  onAddIngredient(form: NgForm) {
    if (this.modo === 'add'){
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
    }else{
      const ingredient: Ingredient = {
        id: this.paramValue,
        ingredient: form.value.ingredient,
        quantity: form.value.quantity,
        measurement: form.value.measurement,
        measurementUnit: form.value.measurementUnit,
        expirationDate: form.value.expirationDate,
        price: form.value.price,
      };
      this.ingredientService.updateIngredient(ingredient)
    }
  }
}
