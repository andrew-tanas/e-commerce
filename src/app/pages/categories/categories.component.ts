import { Data } from './../../../../node_modules/memfs/lib/fsa/types.d';
import { SubcategoriesService } from '../../core/services/subcategories/subcategories.service';
import { Icategory, IsubCategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  private readonly categoriesService = inject(CategoriesService);
  private readonly subcategoriesService = inject(SubcategoriesService);

  categories:Icategory[] = [];
  subCategories:IsubCategory[] = [];
  subCatName:WritableSignal<string> = signal('');

  subCatShow:boolean = false;

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categories = res.data;
      }
    })
    
  }

  showSubCategories(id:string, name:string):void{
      this.subcategoriesService.getAllSubcategories(id).subscribe({
        next:(res)=>{
          this.subCatShow = true;
          console.log(res)
          this.subCategories = res.data;
          this.subCatName.set(name);
        }
      })
  }

}
