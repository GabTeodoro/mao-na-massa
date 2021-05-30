import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  private ingredients: Ingredient[] = [];
  private updatedIngredientsList = new Subject<Ingredient[]>();
  private urlIngredient = "http://localhost:5000/MaoNaMassa";

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  getIngredients(): void {
    this.httpClient
      .get<{ message: string; ingredients: any }>(
        this.urlIngredient
      )
      .pipe(
        map((data) => {
          return data.ingredients.map((ingredients) => {
            return {
              id: ingredients._id,
              ingredient: ingredients.ingredient,
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

  addIngredient(ingredient: Ingredient) {
    this.httpClient
      .put<{ message: string; id: string }>(
        this.urlIngredient,
        ingredient
      )
      .subscribe((data) => {
        ingredient.id = data.id;
        this.ingredients.push(ingredient);
        this.updatedIngredientsList.next([...this.ingredients]);
        this.router.navigate(['/'])
      });
  }

  deleteIngredient(id: string): void {
    this.httpClient
      .delete(this.urlIngredient+`/${id}`)
      .subscribe(() => {
        this.ingredients = this.ingredients.filter((ingre) => {
          return ingre.id !== id;
        });
        this._document.defaultView.location.reload();
      });
  }

  getIngredient(idIngredient: any) {
    return this.httpClient.get<{
      message: string,  ingredients: Ingredient
    }>(this.urlIngredient+`/${idIngredient}`);
  }

  updateIngredient(ingredient: Ingredient) {
    const i: Ingredient = ingredient;
    this.httpClient.put(this.urlIngredient+`/${i.id}`, i).subscribe((res)=>{
      const copia = [...this.ingredients]
      const indice = copia.findIndex(ingre => ingre.id === i.id)
      copia[indice] = i;
      this.ingredients = copia
      this.updatedIngredientsList.next([...this.ingredients])
      this.router.navigate(['/'])
    })
  }
}
