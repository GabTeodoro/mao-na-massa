import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { usuarioGuard } from './Usuario/usuarioguard';

// Ingredients
import { AddIngredientsComponent } from './ingredients/add-ingredients/add-ingredients.component';
import { ListIngredientsComponent } from './ingredients/list-ingredients/list-ingredients.component';

// Recipes
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { ListRecipesComponent } from './recipes/list-recipes/list-recipes.component';

import { AddItemsProducedComponent } from './itemsProduced/add-items-produced/add-items-produced.component';
import { ListItemsProducedComponent } from './itemsProduced/list-itemsProduced/list-itemsProduced.component';

import { loginComponent } from './Login/login.component';
import { singupComponent} from './Singup/singup.component'

const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'add/ingredient', component: AddIngredientsComponent, canActivate:[usuarioGuard]},
  { path: 'list/ingredients', component: ListIngredientsComponent, canActivate:[usuarioGuard] },
  { path: 'add/recipe', component: AddRecipeComponent, canActivate:[usuarioGuard] },
  { path: 'list/recipes', component: ListRecipesComponent, canActivate:[usuarioGuard] },
  { path: 'add/items-produced', component: AddItemsProducedComponent, canActivate:[usuarioGuard] },
  { path: 'list/items-produced', component: ListItemsProducedComponent, canActivate:[usuarioGuard] },
  { path: 'login', component: loginComponent},
  { path:'singup', component: singupComponent}
];

@NgModule({
  //,{onSameUrlNavigation: "reload"}
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [usuarioGuard]
})
export class AppRoutingModule {}
