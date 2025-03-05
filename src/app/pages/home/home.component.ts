import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService)

  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  imagesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
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
      }
    },
    nav: false
  }

  products:Iproduct[] = [];
  categories:Icategory[] = [];

  searchTerm:string = '';

  getProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products = res.data; 
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getCategoryData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoryData();
  }

  addToCart(id:string):void {
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          this.toastrService.success(res.message, 'Fresh cart');
          this.cartService.cartNumber.set(res.numOfCartItems);
        }
        
      }
    })
  }
}
