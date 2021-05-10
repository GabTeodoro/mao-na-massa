import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { itemsProduced } from '../itemsProduced.model';
import { itemsProducedService } from '../itemsProduced.service';

@Component({
  selector: 'app-list-itemsProduced',
  templateUrl: './list-itemsProduced.component.html',
  styleUrls: ['./list-itemsProduced.component.css']
})

export class ListItemsProducedComponent implements OnInit{
    itemsProduced: itemsProduced[] = [{
        id: '23',
        quantity: 4,
        productionDate: '2021/05/05',
        expirationDate: '2021/05/10',
        costValue: 10,
        totalValue: 20,
    }]

    private itemsProducedSubscription: Subscription;

    constructor(public itemsProducedService: itemsProducedService) {}

    ngOnInit(): void {
      this.itemsProducedService.getItemsProduced();
      this.itemsProducedSubscription = this.itemsProducedService
        .getUpdateditemsProducedListObservable()
        .subscribe((itemsProduced: itemsProduced[]) => {
          this.itemsProduced = itemsProduced;
        });
    }

    ngOnDestroy(): void {
      this.itemsProducedSubscription.unsubscribe();
    }
  }
