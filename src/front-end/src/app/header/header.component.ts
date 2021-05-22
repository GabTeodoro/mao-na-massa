import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Subscription } from 'rxjs';
import { notification } from './notification.model';

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
    console.log("ngOnInit()")
    this.notificationService.getNotification();
    this.notificationSubscription =
    this.notificationService.getUpdatedNotificationList().subscribe((notification: notification[])=>{
      this.notifications = notification
      this.verif = this.notifications.length > 0;
      console.log("dentro do subscribe"+notification);
    })
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }

}
