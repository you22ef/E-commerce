import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  errMsg!:string;
  isLogin:boolean = false;

  constructor(private _AuthService:AuthService , private _Router:Router)
  {

  }
  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)]),
    rePassword: new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)]),
    phone: new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },this.checkPasswordData);
  
  sendData():void
  {
    this.isLogin = true;
    this._AuthService.sendRegister(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this._Router.navigate(['/login']);
        this.isLogin = false;
      },
      error: (error) => {
        console.log(error);
        this.errMsg = error.error.message;
        this.isLogin = false;
      }

    });
  }

  checkPasswordData(form:any)
  {
    if(form.get('password').value === form.get('rePassword').value)
    {
      return null;
    }
    else
    {
      return {'password': true};
    }
  }

}
