import { map, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalUpdatePassService {

  baseUrl: string = 'http://localhost:3000/'

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  updatePassword(email: string, newpass: string): Observable<any> {
    const url = `${this.baseUrl}update`;
    return this.http.post<any>(url, { email: email, password: newpass }).pipe(
      map(obj => obj));
  }

  sucessMessage(message: string){
    this.toastr.success(`${message}`);
  }

  errorMessage(message: string){
    this.toastr.error(`${message}`)
  }
}
