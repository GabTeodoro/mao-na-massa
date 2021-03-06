import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddIngredientsComponent } from './ingredients/add-ingredients/add-ingredients.component';
import { ListIngredientsComponent } from './ingredients/list-ingredients/list-ingredients.component';
import { AddItemsProducedComponent } from './itemsProduced/add-items-produced/add-items-produced.component';
import { ListItemsProducedComponent } from './itemsProduced/list-itemsProduced/list-itemsProduced.component';

import { IngredientService } from './ingredients/ingredient.service';
import { AppRoutingModule } from './app-routing.module';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { ListRecipesComponent } from './recipes/list-recipes/list-recipes.component';
import { RecipeService } from './recipes/recipe.service';
import { itemsProducedService } from './itemsProduced/itemsProduced.service';
import { HomeComponent } from './home/home.component';
import { UsuarioService } from './Usuario/usuario.service';
import { loginComponent } from './Login/login.component';
import {singupComponent} from './Singup/singup.component'
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AddIngredientsComponent,
    ListIngredientsComponent,
    AddRecipeComponent,
    ListRecipesComponent,
    AddItemsProducedComponent,
    loginComponent,
    singupComponent,
    ListItemsProducedComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [IngredientService,RecipeService,itemsProducedService,UsuarioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
