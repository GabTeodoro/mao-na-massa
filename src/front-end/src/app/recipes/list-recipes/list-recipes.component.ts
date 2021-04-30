import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css']
})
export class ListRecipesComponent implements OnInit{
  recipes: Recipe[] = [{
    id:'123',
    lines:[{
      id: '1',
      ingredientId: '122222',
      quantityIngredient:3,
      total: 3
    }],
    minimumValue: 3,
    priceSuggestion: 5,
    productionDate: 'hoje',
    profitPercentage: 10,
    finalPrice: 10,
    name: 'teste da receita'
  }];
  private recipeSubscription: Subscription;
  constructor(public recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipe();
    this.recipeSubscription = this.recipeService.getUpdatedRecipesListObservable()
      .subscribe((ingredients: Recipe[]) => {
        console.log(ingredients);
        this.recipes = ingredients;
      });
  }


  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
