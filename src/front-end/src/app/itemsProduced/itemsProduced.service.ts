import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { itemsProduced } from './itemsProduced.model';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({providedIn: 'root'})
export class itemsProducedService {


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
    ) { }

  private itemsProduced: itemsProduced[] = [];
  private updateditemsProducedList = new Subject<itemsProduced[]>();
  private urlItemsProduced = 'http://localhost:7000/MaoNaMassa'

  ngOnInit(): void {}

  editItemsProduced(itemProduced: itemsProduced) {
    const i= itemProduced
    this.httpClient.put<{message: string}>(this.urlItemsProduced+`/${itemProduced.id}`, i).subscribe((res)=>{
      const copia = this.itemsProduced;
      const index = copia.findIndex(item=>item.id === i.id);

      copia[index] = i;
      this.itemsProduced = copia;
      this.updateditemsProducedList.next([...this.itemsProduced]);
      this.router.navigate(['/']);
    })
  }

  getItemsProduced():void{
    this.httpClient.get<{message: string,itemsProduced: any}>(this.urlItemsProduced)
    .pipe(
      map((data) => {
        return data.itemsProduced.map((rec) => {
          return {
            id: rec._id,
            name: rec.name,
            quantity: rec.quantity,
            productionDate: rec.productionDate,
            expirationDate: rec.expirationDate,
            costValue: rec.costValue,
            totalValue: rec.totalValue
          };
        });
      })
    ).subscribe((itemsProduced)=>{
      const item = itemsProduced;
      this.itemsProduced = item
      this.updateditemsProducedList.next([...this.itemsProduced])
    })
  }

  getItemsProducedById(id: String):void{
    this.httpClient.get<{message: string,itemsProduced: any}>(this.urlItemsProduced+"/User/"+id)
    .pipe(
      map((data) => {
        return data.itemsProduced.map((rec) => {
          return {
            id: rec._id,
            userId: rec.userId,
            name: rec.name,
            quantity: rec.quantity,
            productionDate: rec.productionDate,
            expirationDate: rec.expirationDate,
            costValue: rec.costValue,
            totalValue: rec.totalValue
          };
        });
      })
    ).subscribe((itemsProduced)=>{
      const item = itemsProduced;
      this.itemsProduced = item
      this.updateditemsProducedList.next([...this.itemsProduced])
    })
  }

  getItemProduced(id: String){
    return this.httpClient.get<{message: string,itemProduced: any}>(this.urlItemsProduced+`/${id}`)
  }

  deleteItemsProduced(id: String) {
    this.httpClient.delete<{message: string}>(this.urlItemsProduced+`/${id}`)
    .subscribe(()=>{
      this.itemsProduced =this.itemsProduced.filter((rec)=>rec.id!=id)
    })
    this._document.defaultView.location.reload();
  }

  getUpdateditemsProducedListObservable(){
    return this.updateditemsProducedList.asObservable();
  }

  additemsProduced(itemsProduced: itemsProduced) {
    this.httpClient
      .put<{ message: string; id: string }>(
        this.urlItemsProduced,
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
