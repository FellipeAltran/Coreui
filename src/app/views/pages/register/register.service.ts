import { User } from './register.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl: string = 'http://localhost:3000/'

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  save(item: any): Observable<any> {
    const url = `${this.baseUrl}register`;
    // console.log(url);
    return this.http.post<any>(url, item).pipe(
      map(obj => obj));
  }

  sucessMessage(message: string) {  
    this.toastr.success(`${message}`);
  }

  errorMessage(message: string) {
    this.toastr.error(`${message}`)
  }
}
