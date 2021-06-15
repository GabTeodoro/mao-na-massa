import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { notification } from './notification.model';
import { NotificationService } from './notification.service';
import { UsuarioService } from '../Usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private notificationService: NotificationService,
    private usuarioService: UsuarioService) { }

  private notificationSubscription: Subscription;
  notifications: notification[] = [];
  verif: boolean;
  private usuarioObserver: Subscription;
  public autenticado: boolean = false;

  ngOnInit(): void {
    this.autenticado = localStorage.getItem("isAutenticado")=="true";
    this.usuarioObserver = this.usuarioService.getStatusSubject()
    .subscribe( (autenticado) => {
      console.log(autenticado)
      console.log(this.usuarioService.isAutenticado())
      this.autenticado = autenticado;
    })
    this.notificationService.getNotification();
    this.notificationSubscription =
      this.notificationService
        .getUpdatedNotificationList()
        .subscribe((notifications: notification[])=>{
          this.notifications = notifications
          this.verif = this.notifications.length > 0;
      }
      )
  }

  public onLogout(): void{
    this.usuarioService.logout();
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
    this.usuarioObserver.unsubscribe();
  }
}
