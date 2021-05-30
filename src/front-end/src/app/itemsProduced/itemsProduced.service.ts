import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { itemsProduced } from './itemsProduced.model';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class itemsProducedService {
  constructor(private httpClient: HttpClient, private router: Router) { }

  private itemsProduced: itemsProduced[] = [];
  private updateditemsProducedList = new Subject<itemsProduced[]>();

  ngOnInit(): void {}

  getItemsProduced():void{
    const retorno: itemsProduced[]= [{
      id: '23',
      quantity: 4,
      productionDate: '20210505',
      expirationDate: '20210510',
      costValue: 10,
      totalValue: 20,
    }]
    this.itemsProduced = retorno
    // console.log(this.recipes)
    this.updateditemsProducedList.next([...this.itemsProduced])
    console.log(this.updateditemsProducedList.asObservable().subscribe((itemsProduced)=>{
      return itemsProduced
    }))
  }

  getUpdateditemsProducedListObservable(){
    return this.updateditemsProducedList.asObservable();
  }

  additemsProduced(itemsProduced: itemsProduced) {
    this.httpClient
      .post<{ message: string; id: string }>(
        'https://localhost:3000/MaoNaMassa/itemsProduced',
        itemsProduced
      )
      .subscribe((data) => {
        itemsProduced.id = data.id;
        this.itemsProduced.push(itemsProduced);
        this.updateditemsProducedList.next([...this.itemsProduced]);
        this.router.navigate([''])
      });
  }

}
