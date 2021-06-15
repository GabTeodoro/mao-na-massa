import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { itemsProduced } from '../itemsProduced.model';
import { itemsProducedService } from '../itemsProduced.service';

@Component({
  selector: 'app-list-itemsProduced',
  templateUrl: './list-itemsProduced.component.html',
  styleUrls: ['./list-itemsProduced.component.css']
})

export class ListItemsProducedComponent implements OnInit{
    itemsProduced: itemsProduced[] = []

    private itemsProducedSubscription: Subscription;

    constructor(public itemsProducedService: itemsProducedService, private router: Router) {}

    ngOnInit(): void {
      this.itemsProducedService.getItemsProducedById(localStorage.getItem("idUsuario"));
      this.itemsProducedSubscription = this.itemsProducedService
        .getUpdateditemsProducedListObservable()
        .subscribe((itemsProduced: itemsProduced[]) => {
          this.itemsProduced = itemsProduced;
        });
    }

    onDeleteItemProduced(id:String){
      this.itemsProducedService.deleteItemsProduced(id);
    }
    onEditItemProduced(id: string){
      this.router.navigate(['/add/items-produced'],{ queryParams:{idItemProduced: id}})
    }

    ngOnDestroy(): void {
      this.itemsProducedSubscription.unsubscribe();
    }
  }
