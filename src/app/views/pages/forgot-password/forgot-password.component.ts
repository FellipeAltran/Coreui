import { Router } from '@angular/router';
import { ForgotPasswordService } from './forgot-password.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { changePassword } from './forgot-password.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formNewPassword!: FormGroup;

  constructor(private service: ForgotPasswordService, private router: Router) { }

  ngOnInit(): void {
    this.changePassword(new changePassword);
  }

  getForm(property: string) {
    return this.formNewPassword.get(property);
  }

  sendRequest() {
    console.log(JSON.stringify(this.formNewPassword.getRawValue()));
    if (this.formNewPassword.invalid) {
      this.formNewPassword.markAllAsTouched();
      return;
    }
  }

  changePassword(changepassword: changePassword){
    this.formNewPassword = new FormGroup({
      email: new FormControl(changepassword.email, [Validators.required, Validators.email]),
      newPassword: new FormControl(changepassword.newPassword, [Validators.required, Validators.minLength(8)])
    })
  }

  savePassword(){
    const obj = this.formNewPassword.getRawValue();
    this.service.updatePasswordUser(obj.email, obj.newPassword).subscribe((value) => {
      if (value.boolean == true) {
        this.router.navigate([`/login`]);
        this.service.sucessMessage(value.message);
      }else {
        this.service.errorMessage(value.message);
      }
    });
  }

}
