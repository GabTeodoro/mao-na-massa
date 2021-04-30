import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {
  constructor(private httpClient: HttpClient) { }

  private recipes: Recipe[] = [];
  private updatedRecipesList = new Subject<Recipe[]>();

  ngOnInit(): void {}

  getRecipe():void{
    const retorno =[{
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
    }]
    this.recipes = retorno
    // console.log(this.recipes)
    this.updatedRecipesList.next([...this.recipes])
    console.log(this.updatedRecipesList.asObservable().subscribe((recipe)=>{
      return recipe
    }))
  }

  getUpdatedRecipesListObservable(){
    return this.updatedRecipesList.asObservable();
  }


  addRecipe(recipe: Recipe){
    console.log('Adding recipe: \n'+JSON.stringify(recipe))
  }

}

