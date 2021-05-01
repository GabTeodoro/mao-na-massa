import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddIngredientsComponent } from './ingredients/add-ingredients/add-ingredients.component';
import { ListIngredientsComponent } from './ingredients/list-ingredients/list-ingredients.component';

import { IngredientService } from './ingredients/ingredient.service';
import { AppRoutingModule } from './app-routing.module';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { ListRecipesComponent } from './recipes/list-recipes/list-recipes.component';
import { RecipeService } from './recipes/recipe.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddIngredientsComponent,
    ListIngredientsComponent,
    AddRecipeComponent,
    ListRecipesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatButtonModule,
    MatSliderModule,
    BrowserAnimationsModule
  ],
  providers: [IngredientService,RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
