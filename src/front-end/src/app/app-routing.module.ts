import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Ingredients
import { AddIngredientsComponent } from './ingredients/add-ingredients/add-ingredients.component';
import { ListIngredientsComponent } from './ingredients/list-ingredients/list-ingredients.component';

// Recipes
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { ListRecipesComponent } from './recipes/list-recipes/list-recipes.component';

const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'add/ingredient', component: AddIngredientsComponent },
  { path: 'list/ingredients', component: ListIngredientsComponent },
  { path: 'add/recipe', component: AddRecipeComponent },
  { path: 'list/recipes', component: ListRecipesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
