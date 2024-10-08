import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  id:string ='';
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  myProduct!: Product;
  constructor(private _productService: ProductService,private _activatedRoute:ActivatedRoute, private _CartService:CartService, private _toastr:ToastrService)
  {

  }
  
  ngOnInit():void
  {
    
    
    this._activatedRoute.paramMap.subscribe((res:any) =>{

      this.id = res.params.pid;
      
        this._productService.getSpecProduct(res.params.pid).subscribe({
          next: (res:any) => {
            this.myProduct = res.data;
          },
          error: (err:any) => {
            console.log(err);
          }
        });
    });

    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem('currentPage', `/product-details/${this.id}`);
    }
    
  }

  addProduct()
  {
    this._CartService.addProductToCart(this.id).subscribe({
      next: (res) => {
        this._CartService.cartNum.next(res.numOfCartItems);
        this._toastr.success(res.message);
      },
      error: (err) => {
        this._toastr.success(err.message);
      }
    });
  }

}
