import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  private ingredients: Ingredient[] = [];
  private updatedIngredientsList = new Subject<Ingredient[]>();

  constructor(private httpClient: HttpClient) {}

  getIngredients(): void {
    this.httpClient
      .get<{ message: string; ingredients: any }>(
        'http://localhost:3000/maoNaMassa'
      )
      .pipe(
        map((data) => {
          return data.ingredients.map((ingredients) => {
            return {
              id: ingredients._id,
              ingredient: ingredients.ingredients,
              quantity: ingredients.quantity,
              measurement: ingredients.measurement,
              measurementUnit: ingredients.measurementUnit,
              expirationDate: ingredients.expirationDate,
              price: ingredients.price,
            };
          });
        })
      )
      .subscribe((ingredients) => {
        this.ingredients = ingredients;
        this.updatedIngredientsList.next([...this.ingredients]);
      });
  }

  getUpdatedIngredientsListObservable() {
    return this.updatedIngredientsList.asObservable();
  }

  addIngredient(
    ingredient: string,
    quantity: number,
    measurement: string,
    measurementUnit: string,
    expirationDate: string,
    price: number
  ) {
    const ingre: Ingredient = {
      id: null,
      ingredient: ingredient,
      quantity: quantity,
      measurement: measurement,
      measurementUnit: measurementUnit,
      expirationDate: expirationDate,
      price: price,
    };
    this.httpClient
      .post<{ message: string; id: string }>(
        'http://localhost:3000/maoNaMassa',
        ingre
      )
      .subscribe((data) => {
        ingre.id = data.id;
        this.ingredients.push(ingre);
        this.updatedIngredientsList.next([...this.ingredients]);
      });
  }

  deleteIngredient(id: string): void {
    this.httpClient
      .delete(`http://localhost:3000/maoNaMassa/:${id}`)
      .subscribe(() => {
        this.ingredients = this.ingredients.filter((ingre) => {
          return ingre.id !== id;
        });
      });
  }
}
