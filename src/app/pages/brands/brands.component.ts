import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  private readonly brandsService = inject(BrandsService);

  brands:Ibrands[] = [];

  ngOnInit(): void {
    this.callBrandsApi()
    
  }
  callBrandsApi():void{
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.brands = res.data;
      }
    })
  }

}
