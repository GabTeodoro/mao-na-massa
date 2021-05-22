import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { notification } from './notification.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class NotificationService {
  constructor(private httpClient: HttpClient, private router: Router) { }
  ngOnInit(): void {}

  private notifications: notification[] = [];
  private updatedNotificationList = new Subject<notification[]>();

  getNotification():void{
    const data = new Date()
    const retorno:notification[] = [{
      id: '123',
      message: "O ingrediente {Insira seu ingrediente aqui} está em falta.",
      date: data.getUTCDate(),
      type: '123'
    }]

    this.notifications = retorno;
    this.updatedNotificationList.next([...this.notifications])

    console.log("está chamando o getNotification()")
  }
  deleteNotification():void{

  }

  getUpdatedNotificationList(){
    console.log(this.notifications)
    return this.updatedNotificationList.asObservable();
  }

}
