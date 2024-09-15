import { Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Category } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy  {
  myCategories!:Category[];
  constructor(private _CategoriesService:CategoriesService){}
  ngOnDestroy(): void {
    if(typeof localStorage !== 'undefined')
    {
      localStorage.removeItem('home');
    }
  }

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
      },
    },
    nav: true,
    rtl: true,
  }

  customOptionsCategory: OwlOptions = {
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
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1200: {
        items: 5 
      },
      1400: {
        items: 6 
      }
    },
    nav: true,
    rtl: true,
  }
  ngOnInit()
  {
    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem('currentPage', '/home');
      localStorage.setItem('home', '/home');
    }
    this._CategoriesService.getCategories().subscribe({
      next: (response) => {
        this.myCategories = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
   
  }
}
