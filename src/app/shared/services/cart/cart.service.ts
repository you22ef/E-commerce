import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartNum:BehaviorSubject<number> = new BehaviorSubject<number>(0);


  constructor(@Inject(PLATFORM_ID) private x:object,private _httpClient:HttpClient) {}

  

  addProductToCart(pId:string):Observable<any>
  {
    return this._httpClient.post(`${Environment.baseUrl}/api/v1/cart`,
      {
        "productId": pId,
      }
    );
  }

  updateProductQuantity(pId:string,pCount:string):Observable<any>
  {
    return this._httpClient.put(`${Environment.baseUrl}/api/v1/cart/${pId}`,
      {
        "count": pCount
      }
    );
  }

  getCart():Observable<any>
  {
    return this._httpClient.get(`${Environment.baseUrl}/api/v1/cart`);
  }

  removeSpecItem(pId:string):Observable<any>
  {
    return this._httpClient.delete(`${Environment.baseUrl}/api/v1/cart/${pId}`);
  }

  clearCart():Observable<any>
  {
    return this._httpClient.delete(`${Environment.baseUrl}/api/v1/cart`);
  }
}
