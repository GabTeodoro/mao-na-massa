import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { notification } from './notification.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private notificationService: NotificationService) { }

  private notificationSubscription: Subscription;
  notifications: notification[] = [];
  verif: boolean;

  ngOnInit(): void {
    this.notificationService.getNotification();
    this.notificationSubscription =
      this.notificationService
        .getUpdatedNotificationList()
        .subscribe((notifications: notification[])=>{
          this.notifications = notifications
          this.verif = this.notifications.length > 0;
      })
  }
  onBlur(){
    if(this.verif){
      this.notifications = []
      this.notificationService.deleteNotification();
      this.verif = this.notifications.length > 0;
    }
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }

}
