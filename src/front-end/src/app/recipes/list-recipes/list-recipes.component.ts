import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css']
})
export class ListRecipesComponent implements OnInit{
  recipes: Recipe[] = []

  private recipeSubscription: Subscription;
  constructor(public recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipeService.getRecipesById(localStorage.getItem("idUsuario"));
    this.recipeSubscription = this.recipeService.getUpdatedRecipesListObservable()
      .subscribe((recipe: Recipe[]) => {
        this.recipes = recipe;
      });
  }

  onAddRecipe(form:NgForm){
    console.log(form.value)
  }

  onRemoveRecipe(id: string){
    this.recipeService.removeRecipe(id)
  }

  onEditRecipe(id: string){
    this.router.navigate(['add/recipe'],{ queryParams: { idRecipe: id } });
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
