import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ingredients',
  templateUrl: './list-ingredients.component.html',
  styleUrls: ['./list-ingredients.component.css'],
})
export class ListIngredientsComponent implements OnInit {
  ingredients: Ingredient[] = [];
  private ingredientSubscription: Subscription;

  constructor(public ingredientService: IngredientService, private router: Router) {}

  onDeleteIngredient(id: string) {
    console.log(id);
    this.ingredientService.deleteIngredient(id);
  }

  onEditIngredient(id: string) {
    this.router.navigate(['add/ingredient'],{ queryParams: { idIngredient: id } });
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
