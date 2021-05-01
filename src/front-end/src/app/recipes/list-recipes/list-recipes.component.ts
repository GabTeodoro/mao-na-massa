import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
      id:'12233',
      ingredient: 'Ingrediente 1',
      quantity: 3,
      measurement: "200",
      measurementUnit: 'g',
      expirationDate: '10/05/21',
      price: 3
    }],
    minimumValue: 3,
    priceSuggestion: 5,
    productionDate: 'hoje',
    profitPercentage: 10,
    finalPrice: 10,
    name: 'teste da receita',
  }]

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

  onAddRecipe(form:NgForm){
    console.log(form.value)
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
