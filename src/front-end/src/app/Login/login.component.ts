import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsuarioService } from '../Usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit {

    estaCarregando: boolean = false;

    constructor(private usuarioService: UsuarioService) { }

    onLogin (form: NgForm): void {
      if(form.invalid) return;
    this.usuarioService.login(form.value.email, form.value.password);
    }

  ngOnInit(): void {
  }

}
