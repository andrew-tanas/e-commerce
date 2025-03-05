import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';

@Component({
  selector: 'app-products',
  imports: [RouterLink, FormsModule, CarouselModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

    private readonly productsService = inject(ProductsService)
    private readonly categoriesService = inject(CategoriesService);
    private readonly cartService = inject(CartService);
    private readonly wishlistService = inject(WishlistService);
    private readonly toastrService = inject(ToastrService);

    products:Iproduct[] = [];
    searchTerm:string = '';


  ngOnInit(): void {
    this.getProductsData()
  }


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
  addToWishlist(id:string):void{
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        if(res.status === 'success'){
          this.toastrService.success(res.message, 'Fresh cart');
          // this.cartService.cartNumber.set(res.numOfCartItems);
          console.log(res)
        }
        
      }
    })
  }

}
