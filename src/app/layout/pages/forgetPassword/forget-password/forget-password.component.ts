import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  errMsg!:string;
  emailSent:boolean = false;
  codeSent:boolean = false;
  resetDataSent:boolean = false;
  loading:boolean = false;

  constructor(private _AuthService:AuthService, private _Router:Router)
  {

  }
  ngOnInit()
  {
    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem('currentPage','/forget-password');
    }
    
  }

  emailForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
  });

  
  codeForm:FormGroup = new FormGroup({
    resetCode: new FormControl(null,[Validators.required]),
  });

  resetDataForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    newPassword: new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)])
  });

  sendEmail()
  {
    this.loading = true;
    
    this._AuthService.sendEmailApi(this.emailForm.value).subscribe({
      next: (response) => {
        if(response.statusMsg == 'success')
        {
          console.log(response);
          
          this.emailSent = true;
          this.loading = false;
        }
        
       
      },
      error: (err) => {
        console.log(err);
        
        this.errMsg = err.error.message;
        this.loading = false;
      }
    });

  }

  sendCode()
  {
    this.loading = true;
    this._AuthService.sendCodeApi(this.codeForm.value).subscribe({
      next: (response) => {
        if(response.status == 'Success')
        {
          this.codeSent = true;
          this.loading = false;
        }
       
      },
      error: (err) => {
        this.errMsg = err.error.message;
        this.loading = false;
      }
    });
  }

  resetData()
  {
    this.loading = true;

    this._AuthService.resetDataApi(this.resetDataForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('userToken',response.token);
        this._AuthService.decodeUserData();
        this._Router.navigate(['/home']);
        this.resetDataSent = true;
        this.loading = false;
      },
      error: (err) => {
        this.errMsg = err.error.message;
        this.loading = false;
      }
    });
  }
}
