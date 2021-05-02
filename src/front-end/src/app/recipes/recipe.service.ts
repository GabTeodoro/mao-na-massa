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
    const retorno: Recipe[]= [{
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
    this.httpClient
      .post<{ message: string; id: string;}>('https://localhost:3000/MaoNaMassa/recipe',recipe)
      .subscribe(data =>{

    })
  }

}

