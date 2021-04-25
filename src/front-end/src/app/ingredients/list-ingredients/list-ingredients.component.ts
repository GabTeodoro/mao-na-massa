import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-list-ingredients',
  templateUrl: './list-ingredients.component.html',
  styleUrls: ['./list-ingredients.component.css'],
})
export class ListIngredientsComponent implements OnInit {
  ingredients: Ingredient[] = [];
  private ingredientSubscription: Subscription;

  constructor(public ingredientService: IngredientService) {}

  onDeleteIngredient(id: string) {
    this.ingredientService.deleteIngredient(id);
  }

  onEditIngredient(id: string) {
    console.log('passou aqui editar ' + id);
  }

  ngOnInit(): void {
    this.ingredientService.getIngredients();
    this.ingredientSubscription = this.ingredientService
      .getUpdatedIngredientsListObservable()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }
}
