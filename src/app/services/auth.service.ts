import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/auth.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 'https://todo-eosin-alpha-70.vercel.app/auth' // server error deploy on vercel
  baseUrl:string = 'http://localhost:5000/auth' //send server side (githublink)
  isAuthenticated: any = new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient , private _Router:Router) { 
    if (localStorage.getItem('TS-UR')) {
      this.AuthenticatedUser()
    }
  }

  //Decoded token
  AuthenticatedUser() {
    let decoded = jwtDecode(JSON.stringify(localStorage.getItem('TS-UR')))
    this.isAuthenticated.next(decoded)    
  }

  // Resgiser a new User
  register(formData:Object): Observable<IUser> {
    return this._HttpClient.post<IUser>(`${this.baseUrl}/signUp`, formData)
  }
  // Logs in an existing user
  login(formData:Object): Observable<IUser> {
    return this._HttpClient.post<IUser>(`${this.baseUrl}/logIn`, formData)
  }

  // LogOut => delete token from localStorge
  signOut() {
    localStorage.removeItem('TS-UR')
    this.isAuthenticated.next(null)
    this._Router.navigate(['./logIn'])
  }
}
