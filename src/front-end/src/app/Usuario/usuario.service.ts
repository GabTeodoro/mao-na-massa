import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuario } from './usuario.model';
// import { Subject } from 'rxjs'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private token: string;
  private urlUser = "http://localhost:9000/MaoNaMassa"

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  addUsuario(email: string, senha: string){
    const usuario: usuario = {
      email: email,
      password: senha
    }
    this.httpClient.put(this.urlUser+"/signup", usuario).
      subscribe({
        //vamos para página principal quando o usuário é criado com sucesso
        next: () => this.router.navigate(['/']),
        //notificamos todos os componentes que não há usuário autenticado
        // error: () => this.authStatusSubject.next(false)
      });
  }


  login (email: string, senha: string){
    const usuario: usuario = {
      email: email,
      password: senha
    }
    this.httpClient.put<{token: string}>(this.urlUser+"/login",
    usuario).subscribe(resposta => {
    this.token = resposta.token;
    this.router.navigate(['/']);
      })
  }

}