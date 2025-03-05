import { Icategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  private readonly categoriesService = inject(CategoriesService);

  categories:Icategory[] = [];


  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categories = res.data;
      }
    })
    
  }

}
