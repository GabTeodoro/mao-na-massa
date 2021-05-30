import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RecipeService {
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  private recipes: Recipe[] = [];
  private updatedRecipesList = new Subject<Recipe[]>();
  private recipeUrl = 'http://localhost:4000/MaoNaMassa';

  ngOnInit(): void {}

  getRecipe(id: string) {
    return this.httpClient
    .get<{ message: string; recipe: any }>(
        this.recipeUrl+`/${id}`
    )
  }

  getRecipes(){
    this.httpClient
    .get<{ message: string; recipes: any }>(
        this.recipeUrl
    ).pipe(
      map((data) => {
        return data.recipes.map((rec) => {
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
      })
    ).subscribe((rec) => {
      this.recipes = rec;
      this.updatedRecipesList.next([...this.recipes]);
    });
  }

  getUpdatedRecipesListObservable(){
    return this.updatedRecipesList.asObservable();
  }

  removeRecipe(id: string) {
    this.httpClient.delete<{message: string}>(this.recipeUrl+`/${id}`)
    .subscribe(()=>{
      this.recipes =this.recipes.filter((rec)=>rec.id!=id)
    })
    this._document.defaultView.location.reload();
  }

  addRecipe(recipe: Recipe){
    this.httpClient
    .put<{ message: string; id: string;}>(this.recipeUrl,recipe)
    .subscribe(data =>{
      this.recipes
    })
    this.router.navigate(['/'])
  }



  editRecipe(recipe: Recipe) {
    const r: Recipe = recipe;
    this.httpClient.put<{ message: string}>(this.recipeUrl+`/${r.id}`, r).subscribe((res)=>{
      const copia = [...this.recipes]
      const index =copia.findIndex(rec => rec.id === r.id)
      copia[index] = r;
      this.recipes = copia;
      this.updatedRecipesList.next([...this.recipes])
      this.router.navigate(['/'])
    })
  }
}

