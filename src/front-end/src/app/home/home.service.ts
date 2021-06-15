import { Inject, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../ingredients/ingredient.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class HomeService {
    private recipes: Recipe[] = [];
    private ingredients: Ingredient[] = [];

    private updatedRecipesList = new Subject<Recipe[]>();
    private updatedIngredientsList = new Subject<Ingredient[]>();


    private recipeUrl = 'http://localhost:4000/MaoNaMassa';
    private urlIngredient = "http://localhost:5000/MaoNaMassa";

    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private httpClient: HttpClient,
        private router: Router
    ) { }

    ngOnInit(): void {}

    getRecipes() {
        this.httpClient
        .get<{ message: string; recipes: any }>(
            this.recipeUrl
        )
        .pipe(map((data) => {
            return data.recipes.slice(0, 3).map((rec) => {
            return {
                id: rec._id,
                lines: rec.lines,
                minimumValue: rec.minimumValue,
                suggestedPrice: rec.suggestedPrice,
                productionDate: rec.productionDate,
                profitPercentage: rec.profitPercentage,
                finalPrice: rec.finalPrice,
                name: rec.name,
            };
            });
        }))
        .subscribe((rec) => {
            this.recipes = rec;
            this.updatedRecipesList.next([...this.recipes]);
        });
    }

    getRecipesById(id: String) {
      this.httpClient
      .get<{ message: string; recipe: any }>(
          this.recipeUrl+"/User/"+id
      )
      .pipe(map((data) => {
          return data.recipe.slice(0, 2).map((rec) => {
          return {
              id: rec._id,
              lines: rec.lines,
              minimumValue: rec.minimumValue,
              suggestedPrice: rec.suggestedPrice,
              productionDate: rec.productionDate,
              profitPercentage: rec.profitPercentage,
              finalPrice: rec.finalPrice,
              name: rec.name,
          };
          });
      }))
      .subscribe((rec) => {
          this.recipes = rec;
          this.updatedRecipesList.next([...this.recipes]);
      });
  }

    getUpdatedRecipesListObservable(){
        return this.updatedRecipesList.asObservable();
    }

    getIngredients(): void {
        this.httpClient
        .get<{ message: string; ingredients: any }>(
            this.urlIngredient
        )
        .pipe(map((data) => {
            return data.ingredients.slice(0, 2).map((ingredients) => {
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
        }))
        .subscribe((ingredients) => {
            this.ingredients = ingredients;
            this.updatedIngredientsList.next([...this.ingredients]);
        });
    }

    getIngredientsById(id: String): void {
      this.httpClient
      .get<{ message: string; ingredients: any }>(
          this.urlIngredient+"/User/"+id
      )
      .pipe(map((data) => {
          return data.ingredients.slice(0, 2).map((ingredients) => {
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
      }))
      .subscribe((ingredients) => {
          this.ingredients = ingredients;
          this.updatedIngredientsList.next([...this.ingredients]);
      });
  }

    getUpdatedIngredientsListObservable() {
        return this.updatedIngredientsList.asObservable();
    }
}
