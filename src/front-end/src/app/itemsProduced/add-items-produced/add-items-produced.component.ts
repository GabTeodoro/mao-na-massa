import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { itemsProduced } from '../itemsProduced.model';
import { itemsProducedService } from '../itemsProduced.service';

@Component({
  selector: 'app-add-items-produced',
  templateUrl: './add-items-produced.component.html',
  styleUrls: ['./add-items-produced.component.css']
})
export class AddItemsProducedComponent implements OnInit {

  constructor(public itemsProducedService: itemsProducedService, public route: ActivatedRoute) { }
  sliderValue: number = 0;
  totalValue: number = 3;
  productionValue: number;
  modo = 'add';
  paramValue: string;
  idItemProduced: string;
  @ViewChild('itemsProducedForm') itemsProducedForm: NgForm;


  formatLabel(value: number) {
    this.sliderValue = value;
    this.totalValue = this.productionValue +  (this.productionValue*(value/100));
    return value + '%';
  }
  onAddItemsProduced(form:NgForm){
    if (this.modo === 'add'){
      const itemProduced: itemsProduced = {
        id: "",
        name: form.value.name,
        costValue: form.value.costValue,
        expirationDate: form.value.expirationDate,
        productionDate: form.value.productionDate,
        quantity: form.value.quantity,
        totalValue: form.value.totalValue,
      };
      this.itemsProducedService.additemsProduced(itemProduced);
    }else{
      const itemProduced = {
        id: this.idItemProduced,
        name: form.value.name,
        costValue: form.value.costValue,
        expirationDate: form.value.expirationDate,
        productionDate: form.value.productionDate,
        quantity: form.value.quantity,
        totalValue: form.value.totalValue,
      }
      this.itemsProducedService.editItemsProduced(itemProduced);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      const url = window.location.href;
      if (url.includes('?')){
        const httpParams = new HttpParams({ fromString: url.split('?')[1] });
        this.paramValue = httpParams.get('idItemProduced')
        if(this.paramValue){
          this.idItemProduced = this.paramValue;
          this.itemsProducedService.getItemProduced(this.idItemProduced).subscribe((item)=>{
            const retorno = item.itemProduced;
            const itemProd ={
              name: retorno.name,
              quantity: retorno.quantity,
              productionDate: retorno.productionDate,
              expirationDate: retorno.expirationDate,
              totalValue: retorno.totalValue,
              costValue: retorno.costValue,
            }
            this.modo = 'edit';
            this.itemsProducedForm.setValue(itemProd);
          })
        }
      }else{
        this.modo = 'add';
      }
    })
  }

}
