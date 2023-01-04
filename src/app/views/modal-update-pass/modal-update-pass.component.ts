import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { User } from './../pages/register/register.model';
import { UpdatePass } from './modal-update-pass.model';
import { Observable } from 'rxjs';
import { ModalUpdatePassService } from './modal-update-pass.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-update-pass',
  templateUrl: './modal-update-pass.component.html',
  styleUrls: ['./modal-update-pass.component.scss']
})
export class ModalUpdatePassComponent implements OnInit {

  user!: any;

  formUpdatePass!: FormGroup;

  constructor(private service: ModalUpdatePassService, private router: Router, private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.createForm(new UpdatePass())
  }

  getForm(property: string) {
    return this.formUpdatePass.get(property);
  }

  sendRequest() {
    console.log(JSON.stringify(this.formUpdatePass.getRawValue()));
    if (this.formUpdatePass.invalid) {
      this.formUpdatePass.markAllAsTouched();
      return;
    }
  }

  createForm(updatepass: UpdatePass) {
    this.formUpdatePass = new FormGroup({
      password: new FormControl(updatepass.password, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(updatepass.confirmPassword, [Validators.required, Validators.minLength(8)])
    });
  }

  save() {
    const obj = this.formUpdatePass.getRawValue();
    const tempUser = JSON.parse(localStorage.getItem('user')!);


    if ((obj.password == obj.confirmPassword) && (obj.password.toString().trim().length > 0 && obj.confirmPassword.toString().trim().length > 0)) {
      this.service.updatePassword(tempUser.email, obj.password.toString()).subscribe((value) => {
        if (value.boolean == true) {
          tempUser.password = obj.password;
          const aux = JSON.stringify(tempUser);
          localStorage.setItem('user', aux);
          this.service.sucessMessage(value.message);
          this.modalRef.onHide.emit(tempUser);
        } else {
          this.service.errorMessage(value.message);
        }
      });
    } else {
      this.service.errorMessage('Senhas divergentes');
    }

  }

}
