import { Injectable } from '@angular/core';
import { notification } from './notification.model';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class NotificationService {
  constructor() { }

  private notifications: notification[] = [];
  private updatedNotificationList = new Subject<notification[]>();

  getNotification():void{
    const data = new Date()
    const retorno:notification[] = [{
      id: '123',
      message: "O ingrediente {Insira seu ingrediente aqui} está em falta.",
      date: data.toISOString(),
      type: '123'
    }]

    this.notifications = retorno;
    this.updatedNotificationList.next([...this.notifications])

    console.log("está chamando o getNotification()\n" +JSON.stringify(this.notifications))
  }
  deleteNotification():void{
    console.log("Está deletando as notificações")
  }

  getUpdatedNotificationList(){
    console.log("está chamando  o getUpdatedNotificationList()")
    
    return this.updatedNotificationList.asObservable();
  }

}
