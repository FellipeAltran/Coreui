import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalUpdateNameService {

  baseUrl: string = 'http://localhost:3000/'

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  updateName(oldName: string, newName: string): Observable<any> {
    const url = `${this.baseUrl}changeName`;
    return this.http.post<any>(url, { oldname: oldName, newname: newName }).pipe(
      map(obj => obj));
  }

  sucessMessage(message: string){
    this.toastr.success(`${message}`);
  }

  errorMessage(message: string){
    this.toastr.error(`${message}`)
  }
}
