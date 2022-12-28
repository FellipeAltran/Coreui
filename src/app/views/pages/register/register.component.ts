import { map } from 'rxjs';
import { RegisterService } from '../register/register.service';
import { User } from './register.model';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formUsuario!: FormGroup;

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
    this.createForm(new User());
  }

  createForm(usuario: User){
    this.formUsuario = new FormGroup({
      name: new FormControl(usuario.name, [Validators.required]),
      email: new FormControl(usuario.email, [Validators.required, Validators.email]),
      password: new FormControl(usuario.password,  [Validators.required, Validators.minLength(8)])
    })
  }

  getForm(property: string) {
    return this.formUsuario.get(property);
  }

  sendRequest() {
    // console.log(JSON.stringify(this.formUsuario.getRawValue()));
    // if (this.formUsuario.invalid) {
    //   this.formUsuario.markAllAsTouched();
    //   return;
    // }

    this.registerService.save(this.formUsuario.getRawValue()).subscribe((value) => {
      if (value.boolean != false) {
        this.router.navigate([`/login`]);
        this.registerService.sucessMessage(value.message);
      }else {
        this.registerService.errorMessage(value.message);
      }
    });
  }
}
