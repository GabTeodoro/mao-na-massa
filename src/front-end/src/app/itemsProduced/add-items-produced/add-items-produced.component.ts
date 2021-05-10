import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { itemsProduced } from '../itemsProduced.model';
import { itemsProducedService } from '../itemsProduced.service';

@Component({
  selector: 'app-add-items-produced',
  templateUrl: './add-items-produced.component.html',
  styleUrls: ['./add-items-produced.component.css']
})
export class AddItemsProducedComponent implements OnInit {

  constructor(public itemsProducedService: itemsProducedService) { }
  sliderValue: number = 0;
  totalValue: number = 3;
  productionValue: number;


  formatLabel(value: number) {
    this.sliderValue = value;
    this.totalValue = this.productionValue +  (this.productionValue*(value/100));
    return value + '%';
  }
  onAddItemsProduced(form:NgForm){
    const itemProduced: itemsProduced = {
      id: "",
      costValue: form.value.costValue,
      expirationDate: form.value.expirationDate,
      productionDate: form.value.productionDate,
      quantity: form.value.quantity,
      totalValue: form.value.totalValue,
    };
    this.itemsProducedService.additemsProduced(itemProduced);
  }

  ngOnInit(): void {
  }

}
