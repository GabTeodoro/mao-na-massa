import { Injectable } from '@angular/core';
import { notification } from './notification.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class NotificationService {
  constructor(private httpClient: HttpClient) { }

  private notifications: notification[] = [];
  private updatedNotificationList = new Subject<notification[]>(); // funcao assincrona, todos os subjects escutam
  private urlNotification = 'http://localhost:8000/MaoNaMassa'

  // get pro backend, subscribe pega o retorno do backend e instancia as variaveis locais
  getNotification(){
    try{
      this.httpClient
      .get<{message: string, notifications: notification[]}>(this.urlNotification)
      .subscribe((notif)=>{
        this.notifications = notif.notifications;
        this.updatedNotificationList.next([...this.notifications])
      })
    }catch{}
  }

  getNotificationById(id: string){
    try{
      this.httpClient
      .get<{message: string, notifications: notification[]}>(this.urlNotification+"/User/"+id)
      .subscribe((notif)=>{
        this.notifications = notif.notifications;
        this.updatedNotificationList.next([...this.notifications])
      })
    }catch{}
  }

  deleteNotification(){
    try{
      this.httpClient.delete<{message:string}>(this.urlNotification).subscribe(()=>{
        this.notifications = [];
        this.updatedNotificationList.next([])
      })
    }catch{}
  }

  deleteNotificationByUser(idUser: string){
    try{
      this.httpClient.delete<{message:string}>(this.urlNotification+"/User/"+idUser).subscribe(()=>{
        this.notifications = [];
        this.updatedNotificationList.next([])
      })
    }catch{}
  }

  getUpdatedNotificationList(){
    return this.updatedNotificationList.asObservable();
  }
}
