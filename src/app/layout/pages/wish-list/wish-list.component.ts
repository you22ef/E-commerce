import { Component, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { WishList } from '../../../shared/interfaces/wishlist';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit , OnDestroy {

  WishList:WishList[] = [];
  data:string [] = [];
  sub1!:Subscription;
  sub2!:Subscription;
  sub3!:Subscription;

  constructor(private _WishlistService:WishlistService,private _toastr: ToastrService,private _CartService:CartService) { }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
  }

  ngOnInit(): void 
  {
    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem('currentPage', '/wishList');
    }
    this.sub1 = this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        const newData = response.data.map((item:any)=> item._id);
        this.data = newData;
        this.WishList = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeProductFromWishlist(pId:string, event:MouseEvent)
  {
    event.stopPropagation();
    this.sub2 =  this._WishlistService.removeSpecItem(pId).subscribe({
      next: (res) => {

        
        const target = event.target as HTMLElement;
        if (target) {
          if(target.classList.contains('text-red-600'))
          {
            target.classList.remove('text-red-600');
            target.classList.add('text-black');
          }
          else
          {
            target.classList.add('text-red-600');
            target.classList.remove('text-black');
          }
        }
        this.data = res.data;
        this._toastr.success(res.message);
      },
      error: (err) => {
        this._toastr.error(err.message);
      }
    });
  }

  addProductToCart(pId:string, event:MouseEvent)
  {
    this.sub3 =  this._CartService.addProductToCart(pId).subscribe({
      next: (res) => {
        this._CartService.cartNum.next(res.numOfCartItems);
        this._toastr.success(res.message);
        this.removeProductFromWishlist(pId, event);
      },
      error: (err) => {
        this._toastr.error(err.message);
      }
    });
  }

}
