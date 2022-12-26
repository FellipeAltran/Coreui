import { User } from './register.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl: string = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  save(item: any): Observable<any>{
    const url = `${this.baseUrl}register`;
    console.log(url);
    return this.http.post<any>(url, item).pipe(
      map(obj => obj)); 
  }

  findUser(email: string): Observable<any>{
    const url = `${this.baseUrl}searchEmail`;
    return this.http.post<any>(url, {user_email: email});
  }
}
