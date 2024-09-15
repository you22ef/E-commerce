import { UserData } from './../../interfaces/user-data';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';
import { loginData } from '../../interfaces/user-data';
import { jwtDecode } from 'jwt-decode';
import { json } from 'express';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(@Inject(PLATFORM_ID) private x:object,private _HttpClient:HttpClient, private _router:Router) 
  {
    if(isPlatformBrowser(this.x))
    {
      if(localStorage.getItem('userToken') !== null)
      {
        this.decodeUserData();
        if(localStorage.getItem('currentPage') !== null)
        {
          this._router.navigate([localStorage.getItem('currentPage')]);
        }
        
      }
      
    }

  } 

  

  sendRegister(userData:UserData):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signup`,userData);
  }

  sendLogin(userData:loginData):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signin`,userData);
  }
  decodeUserData()
  {
    let token = localStorage.getItem('userToken');

    this.userData.next(jwtDecode(JSON.stringify(token)));
  }

  sendEmailApi(email:string):Observable<any>
  {
    console.log(email);
    
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/forgotPasswords`, email);
  }

  sendCodeApi(code:string):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/varifyResetCode`, code);
  }

  resetDataApi(userData:loginData):Observable<any>
  {
    return this._HttpClient.put(`${Environment.baseUrl}/api/v1/auth/resetPassword`, userData);
  }



}
