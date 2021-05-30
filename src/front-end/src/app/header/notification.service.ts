import { Injectable } from '@angular/core';
import { notification } from './notification.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class NotificationService {
  constructor(private httpClient: HttpClient) { }

  private notifications: notification[] = [];
  private updatedNotificationList = new Subject<notification[]>();
  private urlNotification = 'http://localhost:8000/MaoNaMassa'

  getNotification(){
    this.httpClient
    .get<{message: string, notifications: notification[]}>(this.urlNotification)
    .subscribe((notif)=>{
      this. notifications = notif.notifications;
      this.updatedNotificationList.next([...this.notifications])
    })
  }

  deleteNotification(){
    console.log("tentando deletar")
    this.httpClient.delete<{message:string}>(this.urlNotification).subscribe(()=>{
      this.notifications = [];
      this.updatedNotificationList.next([])
    })
  }

  getUpdatedNotificationList(){
    console.log("está chamando  o getUpdatedNotificationList()")

    return this.updatedNotificationList.asObservable();
  }

}
