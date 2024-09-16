import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  show: boolean = false;
  errMsg!:string;
  isLogin:boolean = false;
  loginSub!:Subscription;

  constructor(private _AuthService:AuthService , private _Router:Router)
  {

  }

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)]),

  });
  
  sendData():void
  {
    this.isLogin = true;
    this.loginSub = this._AuthService.sendLogin(this.loginForm.value).subscribe({
      next: (response) => {
        if(localStorage.getItem('NavigateTo') !== null)
        {
          this._Router.navigate([localStorage.getItem('NavigateTo')]);
          localStorage.removeItem('NavigateTo');
        }
        else
        {
          this._Router.navigate(['/home']);
        }
        this.isLogin = false;
        localStorage.setItem('userToken',response.token);
        this._AuthService.decodeUserData();
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err.error.message;
        this.isLogin = false;
      }

    });
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }



}
