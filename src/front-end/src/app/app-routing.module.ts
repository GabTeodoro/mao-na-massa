import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Ingredients
import { AddIngredientsComponent } from './ingredients/add-ingredients/add-ingredients.component';
import { ListIngredientsComponent } from './ingredients/list-ingredients/list-ingredients.component';

// Recipes
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { ListRecipesComponent } from './recipes/list-recipes/list-recipes.component';


// Items Produced
// import { AddItemsProducedComponent } from './itemsProduced/add-itemsProduced/;
import { ListItemsProducedComponent } from './itemsProduced/list-itemsProduced/list-itemsProduced.component';
import { AddItemsProducedComponent } from './itemsProduced/add-items-produced/add-items-produced.component';

import { loginComponent } from './Login/login.component';
import { singupComponent} from './Singup/singup.component'

const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'add/ingredient', component: AddIngredientsComponent },
  { path: 'list/ingredients', component: ListIngredientsComponent },
  { path: 'add/recipe', component: AddRecipeComponent },
  { path: 'list/recipes', component: ListRecipesComponent },
  { path: 'add/items-produced', component: AddItemsProducedComponent },
  { path: 'list/items-produced', component: ListItemsProducedComponent },
  { path: 'login', component: loginComponent},
  { path:'singup', component: singupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
