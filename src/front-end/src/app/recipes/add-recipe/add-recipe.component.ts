import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  sliderValue: number = 50;
  rowQuantity: number = 1;
  modo = 'add';
  idRecipe = '';
  recipe;
  private paramValue = '';
  @ViewChild('recipeForm') recipeForm: NgForm;

  formatLabel(value: number) {
    this.sliderValue = value;
    return value + '%';
  }
  add(){
    this.rowQuantity++;
    console.log(this.rowQuantity)
  }
  delete(){
    if (this.rowQuantity > 1){
      this.rowQuantity--;
      console.log(this.rowQuantity)
    }
  }

  onAddRecipe(form:NgForm){
    if (this.modo === 'add'){
      const recipe:Recipe = {
        id: null,
        name: form.value.name,
        lines:[{
          id: null,
          ingredient:form.value.ingredient,
          quantity: form.value.quantity,
          measurement: form.value.measurement,
          measurementUnit: form.value.measurementUnit,
          expirationDate: form.value.expirationDate,
          price: form.value.price,
        }],
        minimumValue: form.value.minimumValue,
        priceSuggestion: form.value.priceSuggestion,
        productionDate: form.value.productionDate,
        profitPercentage: form.value.profitPercentage,
        finalPrice: form.value.finalPrice
      }
      this.recipeService.addRecipe(recipe)
    }else{
      let recipe = form.value;
      recipe.id = this.idRecipe;
      const reci: Recipe = {
        id: recipe.id,
        finalPrice: recipe.finalPrice,
        minimumValue: recipe.minimumValue,
        name: recipe.name,
        priceSuggestion: recipe.priceSuggestion,
        productionDate: recipe.productionDate,
        profitPercentage: recipe.profitPercentage,
        lines: [{
          expirationDate: recipe.expirationDate,
          id: null,
          ingredient: recipe.ingredient,
          measurement: recipe.measurement,
          measurementUnit: recipe.measurementUnit,
          price: recipe.price,
          quantity: recipe.quantity
        }]
      }
      this.recipeService.editRecipe(reci)
    }
  }
  constructor(public recipeService: RecipeService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      const url = window.location.href;
      if(url.includes('?')){
        const httpParams = new HttpParams({ fromString: url.split('?')[1] });
        this.paramValue = httpParams.get('idRecipe');
        if (this.paramValue){
          this.idRecipe = this.paramValue;
          this.recipeService.getRecipe(this.idRecipe).subscribe((recipe)=>{
            this.recipe = recipe.recipe[0];
            const rec = {
              name: this.recipe.name,
              ingredient: this.recipe.lines[0].ingredient,
              quantity: this.recipe.lines[0].quantity,
              measurement: this.recipe.lines[0].measurement,
              measurementUnit: this.recipe.lines[0].measurementUnit,
              expirationDate: this.recipe.lines[0].expirationDate,
              price: this.recipe.lines[0].price,
              minimumValue: this.recipe.minimumValue,
              priceSuggestion: this.recipe.suggestedPrice,
              productionDate: this.recipe.productionDate,
              profitPercentage: this.recipe.profitPercentage,
              finalPrice: this.recipe.finalPrice
            };
            this.recipeForm.setValue(rec);
          });
        }
        this.modo = 'edit'
      }else{
        this.modo = 'add'
        this.idRecipe = ''
      }
    })
  }

}
