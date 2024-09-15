import { pid } from 'process';
import { Component, OnDestroy } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CheckoutService } from '../../../shared/services/checkout/checkout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnDestroy{


  myCart!: Cart;
  sub1!: Subscription;
  sub2!: Subscription;
  sub3!: Subscription;
  sub4!: Subscription;
  
  constructor(private _CartService:CartService, private _toastr:ToastrService) { }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
  }


  ngOnInit()
  {
    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem('currentPage', '/cart');
    }

    this.sub1 = this._CartService.getCart().subscribe({
      next: (response) => {
        this.myCart = response;
      },
      error: (error) => {
        console.log(error);
    }
  });
  }

  updateQuantity(pid: string, pCount: number)
  {
     this.sub2 = this._CartService.updateProductQuantity(pid, pCount.toString()).subscribe({
      next: (response) => {
        console.log(response);
        this.myCart = response;
        this._toastr.success('Cart Updated Successfully');
      },
      error: (error) => {
        console.log(error);
        this._toastr.error('Cart Updated Error');
      }
    });
  }

  removeProduct(pid: string)
  {
    this.sub3 =  this._CartService.removeSpecItem(pid).subscribe({
      next: (response) => {
        this._CartService.cartNum.next(response.numOfCartItems);
        this.myCart = response;
        this._toastr.error('Product Removed Successfully');
      },
      error: (error) => {
        console.log(error);
        this._toastr.error('Product Removed Error');
      }
    });
  }

  clear()
  {
    this.sub4 =  this._CartService.clearCart().subscribe(
      {
        next: (res) => {
          console.log(res);
          
          if(res.message == 'success')
          {
            this.myCart = {} as Cart;
            this._CartService.cartNum.next(0);
            this._toastr.error('Cart Cleared Successfully');
          }
         
        },
        error: (error) => {
          console.log(error);
          this._toastr.error('Cart Cleared Error');
      }
    }
    );
  }

}
