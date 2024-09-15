import { Component } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Category } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  myCategories!: Category[];
  constructor(private _CategoriesService:CategoriesService){}
  ngOnInit()
  {
    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem('currentPage', '/categories');
    }

    this._CategoriesService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.myCategories = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



}
