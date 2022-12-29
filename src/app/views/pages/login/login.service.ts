import { Login } from './login.model';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = 'http://localhost:3000/'

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  loginUser(email: string, password: string): Observable<any>{
    const url = `${this.baseUrl}login`;
    return this.http.post<any>(url, {email: email, password: password}).pipe(
      map(obj => obj));
  }

  takeUser(email: string): Observable<any>{
    const url = `${this.baseUrl}searchEmail`;
    return this.http.post<any>(url, { email: email }).pipe(
      map(obj => obj));
  }

  sucessMessage(message: string){
    this.toastr.success(`${message}`);
  }

  errorMessage(message: string){
    this.toastr.error(`${message}`)
  }
}
