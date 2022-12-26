import { Login } from './login.model';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Observable<any>{
    const url = `${this.baseUrl}login`;
    return this.http.post<any>(url, {email: email, password: password}).pipe(
      map(obj => obj));;
  }
}
