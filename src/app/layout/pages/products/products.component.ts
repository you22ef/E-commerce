import { Product } from './../../../shared/interfaces/product';
import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from "../../../shared/pipes/filter.pipe";
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { Category } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule, RouterLink, FilterPipe, FormsModule ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnDestroy {
  searchTerm: string = '';
  isloading:boolean = false;
  productSub!:Subscription;
  sub!:Subscription;
  sub2!:Subscription;
  sub3!:Subscription;
  sub4!:Subscription;

  

  
  productList: Product[] = [];
 
  data:string[] = [];
  cartNum!: number;
  myCategories!:Category[];
  
  
  constructor(private _ProductService:ProductService , private _CartService:CartService,private _toastr: ToastrService , private _WishlistService:WishlistService){}

  ngOnInit()
  {
    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem('wishList', 'false');
    }
    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem('currentPage', '/product');
    }
   this.sub = this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.productList = response.data;
      }, 
      error: (err) => {
        console.log(err);
      }
    });
    this.sub2 = this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        console.log(response);
        const newData = response.data.map((item:any)=> item._id);
        console.log(newData);
        
        this.data = newData;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  addProduct(pId:string)
  {
    this.isloading = true;
    this.productSub = this._CartService.addProductToCart(pId).subscribe({
      next: (res) => {
        this._CartService.cartNum.next(res.numOfCartItems);
        this.isloading = false;
        this._toastr.success(res.message);
      },
      error: (err) => {
        this.isloading = false;
        this._toastr.success(err.message);
      }
    });
  }

  addProductToWishlist(pId:string, event: MouseEvent)
  {
    event.stopPropagation();

    
    this.sub3 = this._WishlistService.addProductToWishlist(pId).subscribe({
      next: (res) => {
        this._toastr.success(res.message);
        const target = event.target as HTMLElement;
        if (target) {
          if(target.classList.contains('text-red-600'))
          {
            target.classList.remove('text-red-600');
          }
          else
          {
            target.classList.add('text-red-600');
          }
        }
      },
      error: (err) => {
        this._toastr.error(err.message);
      }
    });
  }

  removeProductFromWishlist(pId:string, event:MouseEvent)
  {
    event.stopPropagation();
    this . sub4 = this._WishlistService.removeSpecItem(pId).subscribe({
      next: (res) => {
        this._toastr.success(res.message);
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
      },
      error: (err) => {
        this._toastr.error(err.message);
      }
    });
  }


  ngOnDestroy(): void 
  {
    this.productSub?.unsubscribe();
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
  }
  
}


