import { Component } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { Category } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  myBrands!: Category[];
  constructor(private _BrandsService:BrandsService){}
  ngOnInit()
  {
    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem('currentPage', '/brands');
    }
    this._BrandsService.getBrands().subscribe({
      next: (response) => {
        console.log(response);
        this.myBrands = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
