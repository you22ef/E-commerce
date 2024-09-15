import { UserData } from './../../interfaces/user-data';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  
  mytoken!:any;

  constructor(private _HttpClient:HttpClient) 
  {
    if(typeof localStorage !== 'undefined')
    {
      this.mytoken = {"token" : localStorage.getItem("userToken")};
    }
  }

  

  checkout(cartId:string,UserData:any):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${Environment.localUrl}`,
    {
      "shippingAddress":UserData
    },
    {
      headers: this.mytoken
    }
    );
  }
}
