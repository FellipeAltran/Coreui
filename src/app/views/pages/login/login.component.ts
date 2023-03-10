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
    localStorage.removeItem('user');
  }

  createForm(login: Login) {
    this.formLogin = new FormGroup({
      email: new FormControl(login.email, [Validators.required, Validators.email]),
      password: new FormControl(login.password, [Validators.required, Validators.minLength(8)])
    });
  }

  forgotPassword() {
    this.router.navigate([`/forgotpassword`]);
  }

  getForm(property: string) {
    return this.formLogin.get(property);
  }

  sendRequest() {
    console.log(JSON.stringify(this.formLogin.getRawValue()));
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }
  }

  async login() {
    const obj = this.formLogin.getRawValue();

    this.loginservice.loginUser(obj.email, obj.password).subscribe((value) => {
      if (value == true) {
        this.loginservice.takeUser(obj.email).subscribe((teste) => {
          console.log(teste)
          const local = JSON.stringify(teste);
          localStorage.setItem('user', local);
          this.router.navigate([`/movies`]);
          this.loginservice.sucessMessage('Logado com sucesso!');
        });

      } else {
        this.loginservice.errorMessage('Falha ao logar!');
      }
    });
  }
}
