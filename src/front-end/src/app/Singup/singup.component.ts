import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
 import { UsuarioService } from '../Usuario/usuario.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class singupComponent implements OnInit, OnDestroy {

  estaCarregando: boolean = false;
  private usuarioObserver: Subscription;

  constructor(private usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm): void {
    if (form.invalid) return;
    this.usuarioService.addUsuario(form.value.email, form.value.password);
  }

  ngOnDestroy(): void {
  }

}