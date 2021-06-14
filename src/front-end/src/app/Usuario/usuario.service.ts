import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuario } from './usuario.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private token: string;
  private autenticado: boolean = false;
  private urlUser = 'http://localhost:9000/MaoNaMassa';
  private tokenTimer: NodeJS.Timer;
  private usuarioStatusSubject = new Subject<boolean>();
  private idUsuario: string;

  public getToken(): string {
    return this.token;
  }
  public isAutenticado(): boolean {
    return this.autenticado;
  }

  public getStatusSubject() {
    return this.usuarioStatusSubject.asObservable();
  }

  constructor(private httpClient: HttpClient, private router: Router) {}

  addUsuario(email: string, senha: string) {
    const usuario: usuario = {
      email: email,
      password: senha,
    };
    this.httpClient.put(this.urlUser + '/signup', usuario).subscribe({
      //vamos para página principal quando o usuário é criado com sucesso
      next: () => this.router.navigate(['/']),
      //notificamos todos os componentes que não há usuário autenticado
      // error: () => this.authStatusSubject.next(false)
    });
  }

  login(email: string, senha: string) {
    const usuario: usuario = {
      email: email,
      password: senha,
    };
    this.httpClient
      .put<{ token: string; expiresIn: number; idUsuario: string }>(
        this.urlUser + '/login',
        usuario
      )
      .subscribe((resposta) => {
        this.token = resposta.token;
        if (this.token) {
          const tempoValidadeToken = resposta.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, tempoValidadeToken * 10000);
          console.log(resposta);
          this.autenticado = true;
          this.idUsuario = resposta.idUsuario;
          this.usuarioStatusSubject.next(true);
          this.salvarDadosDeAutenticacao(
            this.token,
            new Date(new Date().getTime() + tempoValidadeToken * 1000),
            this.idUsuario
          );
          this.router.navigate(['/']);
        }
      });
  }
  public logout(): void {
    this.token = null;
    this.usuarioStatusSubject.next(false);
    this.autenticado = false;
    clearTimeout(this.tokenTimer);
    this.idUsuario = null;
    this.removerDadosDeAutenticacao();
    this.router.navigate(['/']);
  }

  private salvarDadosDeAutenticacao(
    token: string,
    validade: Date,
    idUsuario: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('validade', validade.toISOString());
    localStorage.setItem('idUsuario', idUsuario);
  }

  private removerDadosDeAutenticacao() {
    localStorage.removeItem('token');
    localStorage.removeItem('validade');
    localStorage.removeItem('idUsuario');
  }
}
