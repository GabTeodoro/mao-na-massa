import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Ingredient } from '../../ingredients/ingredient.model';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { Cup, Gram, Liter  } from '../../../../../libs/recipes-calc/src/units';
import { Unit } from '../../../../../libs/recipes-calc/src/basicUnit';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  ingredients: Ingredient[] = [];

  public recipeForm2: FormGroup;
  private ingredientSubscription: Subscription;

  constructor(private _formBuilder: FormBuilder,
    public recipeService: RecipeService,
    public route: ActivatedRoute) { 
      this.createForm();
    }

  createForm() {
    this.recipeForm2 = this._formBuilder.group({
      recipeRows: this._formBuilder.array([])
    });
    this.recipeForm2.setControl("recipeRows", this._formBuilder.array([]));
  }

  get recipeRows(): FormArray {
    return this.recipeForm2.get("recipeRows") as FormArray;
  }

  onAddRecipe(form: FormGroup){
    let ingredients: Ingredient[] = [];

    for (let index = 0; index < this.recipeRows.length; index++) {
      let ing = {
        id: null,
        ingredient: this.recipeRows.value[index].ingredient,
        quantity: this.recipeRows.value[index].quantity,
        measurement: this.recipeRows.value[index].measurement,
        measurementUnit: this.recipeRows.value[index].measurementUnit,
        expirationDate: this.recipeRows.value[index].expirationDate,
        price: this.recipeRows.value[index].price
      }
      ingredients.push(ing);
    }

    const recipe:Recipe = {
      id: null,
      name: form.value.name,
      lines: ingredients,
      minimumValue: form.value.minimumValue,
      priceSuggestion: form.value.priceSuggestion,
      productionDate: form.value.productionDate,
      profitPercentage: form.value.profitPercentage,
      finalPrice: form.value.finalPrice
    }
    this.recipeService.addRecipe(recipe)
  }

  onAddRecipe2(recipeForm2: FormGroup) {
    console.log(recipeForm2.value);
  }
  
  initRecipeRows() {
    return this._formBuilder.group({
      ingredient: [''],
      quantity: [''],
      measurement: [''],
      measurementUnit: [''],
      expirationDate: [''],
      price: [''],
      unitPrice: ['']
    })
  }

  addNewIngredient() {
    this.recipeRows.push(this.initRecipeRows());
  }

  deleteIngredient(index: number) {
    this.recipeRows.removeAt(index);
  }

  calculateValue(index: number) {
    let recipeIngredient = this.recipeRows.value[index];
    let unit = new Gram();
    let minValue = 0;

    let pricePerUnity = recipeIngredient.unitPrice / unit.getBaseValueBy(Unit.Kilogram);

    this.recipeRows.controls[index].patchValue({
      price: pricePerUnity * unit.unitConverter(Unit.Kilogram, Number(recipeIngredient.measurement))
    })

    for (let index = 0; index < this.recipeRows.length; index++) {
      minValue += Number.parseFloat(this.recipeRows.value[index].price);
    }
    console.log(minValue);

    this.recipeForm2.controls['minimumValue'].patchValue(minValue);
  }

  setPriceByPercent() {
    const minPrice = this.recipeForm2.value.minimumValue;
    console.log(minPrice);
    const percent = this.recipeForm2.value.profitPercentage / 100;
    console.log(percent);

    this.recipeForm2.controls['priceSuggestion'].patchValue((minPrice + (minPrice * percent)));
    this.recipeForm2.controls['finalPrice'].patchValue((minPrice + (minPrice * percent)));
  }

  getIngredientsInfo(index: number, id: string) {
    let ingredient = this.ingredients.find(i => i.id === id)
    let recipeRow = this.recipeRows.value[index];
    console.log(ingredient);
    console.log(recipeRow);
    this.recipeRows.controls[index].patchValue({
      quantity: ingredient.quantity,
      measurement: [''],
      measurementUnit: [''],
      expirationDate: ingredient.expirationDate,
      price: [''],
      unitPrice: ingredient.price
    })
  }

  ngOnInit(): void {
    this.recipeService.getIngredients();
    this.ingredientSubscription = this.recipeService
    .getUpdatedIngredientsListObservable()
    .subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
    this.recipeForm2 = this.recipeForm2 = this._formBuilder.group({
      name: [''],
      minimumValue: [''],
      priceSuggestion: [''],
      productionDate: [''],
      finalPrice:[''],
      profitPercentage: [''],
      recipeRows: this._formBuilder.array([this.initRecipeRows()])
    })
    // this.route.paramMap.subscribe(()=>{
    //   const url = window.location.href;
    //   if(url.includes('?')){
    //     const httpParams = new HttpParams({ fromString: url.split('?')[1] });
    //     this.paramValue = httpParams.get('idRecipe');
    //     if (this.paramValue){
    //       this.idRecipe = this.paramValue;
    //       this.recipeService.getRecipe(this.idRecipe).subscribe((recipe)=>{
    //         this.recipe = recipe.recipe[0];
    //         const rec = {
    //           name: this.recipe.name,
    //           ingredient: this.recipe.lines[0].ingredient,
    //           quantity: this.recipe.lines[0].quantity,
    //           measurement: this.recipe.lines[0].measurement,
    //           measurementUnit: this.recipe.lines[0].measurementUnit,
    //           expirationDate: this.recipe.lines[0].expirationDate,
    //           price: this.recipe.lines[0].price,
    //           minimumValue: this.recipe.minimumValue,
    //           priceSuggestion: this.recipe.suggestedPrice,
    //           productionDate: this.recipe.productionDate,
    //           profitPercentage: this.recipe.profitPercentage,
    //           finalPrice: this.recipe.finalPrice
    //         };
    //         this.recipeForm.setValue(rec);
    //       });
    //     }
    //     this.modo = 'edit'
    //   }else{
    //     this.modo = 'add'
    //     this.idRecipe = ''
    //   }
    // })
  }

}
