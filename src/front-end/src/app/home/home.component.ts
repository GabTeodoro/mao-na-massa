import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../ingredients/ingredient.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  ingredients: Ingredient[] = [];

  private recipeSubscription: Subscription;
  private ingredientSubscription: Subscription;
  constructor(public homeService: HomeService,
    private router: Router) { }

  onEditRecipe(id: string){}

  onRemoveRecipe(id: string){}

  onEditIngredient(id: string){}

  onRemoveIngredient(id: string){}

  ngOnInit(): void {
    this.homeService.getRecipesById(localStorage.getItem("idUsuario"));
    this.homeService.getIngredientsById(localStorage.getItem("idUsuario"));
    this.recipeSubscription = this.homeService
    .getUpdatedRecipesListObservable()
      .subscribe((recipe: Recipe[]) => {
        this.recipes = recipe;
      });
    this.ingredientSubscription = this.homeService
    .getUpdatedIngredientsListObservable()
    .subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
    this.ingredientSubscription.unsubscribe();
  }
}
