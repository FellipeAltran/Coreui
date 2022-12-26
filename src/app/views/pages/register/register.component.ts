import { RegisterService } from '../register/register.service';
import { User } from './register.model';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formUsuario!: FormGroup;

  constructor(private registerService: RegisterService) { }

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

  sendRequest() {
    console.log(JSON.stringify(this.formUsuario.getRawValue()));
    this.registerService.save(this.formUsuario.getRawValue()).subscribe(() => {
    });
  }
}
