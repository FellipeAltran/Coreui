import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Login } from './login.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin!: FormGroup;

  constructor(private loginservice: LoginService, private router: Router) { 
    this.createForm(new Login());
  }

  createForm(login: Login){
    this.formLogin = new FormGroup({
      email: new FormControl(login.email, [Validators.required, Validators.email]),
      password: new FormControl(login.password,  [Validators.required, Validators.minLength(8)])
    })
  }

  async login(){
    const obj = this.formLogin.getRawValue();
    this.loginservice.loginUser(obj.email, obj.password).subscribe((value) => {
      if (value == true){
        this.router.navigate([`/dashboard`]);
      }
    });
}

}
