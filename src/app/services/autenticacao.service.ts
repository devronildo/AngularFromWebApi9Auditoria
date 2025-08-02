import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioCriacaoDto } from '../models/UsuarioCriacaoDto';
import { UsuarioModel } from '../models/usuarioModel';
import { Response } from '../models/responseModel'
import { UsuarioLoginDto } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  ApiUrl = environment.UrlApi;
  constructor(private http : HttpClient, private router: Router) {}

      RegistrarUsuario(usuario: UsuarioCriacaoDto): Observable<Response<UsuarioModel>>{
            return this.http.post<Response<UsuarioModel>>(`${this.ApiUrl}/Login/Register`, usuario)
      }

      LoginUsuario(usuarioLogin: UsuarioLoginDto): Observable<Response<UsuarioModel>>{
           return this.http.post<Response<UsuarioModel>>(`${this.ApiUrl}/Login/Login`, usuarioLogin)
      }
      Sair(){
         localStorage.removeItem('token')
         this.router.navigate(['/login'])
      }
}
