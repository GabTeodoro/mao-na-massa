import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../ingredients.model';

@Component({
  selector: 'app-list-ingredients',
  templateUrl: './list-ingredients.component.html',
  styleUrls: ['./list-ingredients.component.css']
})
export class ListIngredientsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ingredients: Ingredients[] = [{
    id: "1",
    ingredient: 'Banana',
    quantity: 1,
    price: 2.5,
    measurement: 'unidade',
    expirationDate: "24/04/2022"
  },
  {
    id: "2",
      ingredient: 'Maçã',
      quantity: 1,
      price: 2.5,
      measurement: 'unidade',
      expirationDate: "24/04/2022"
  }
]

  onEditIngredient(id: string){
    console.log('passou aqui editar ' + id)
  }

  onRemoveIngredient(id: string){
    console.log('passou aqui remover ' + id)
  }

}
