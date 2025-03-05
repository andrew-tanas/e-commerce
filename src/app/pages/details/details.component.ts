import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);

  productDetails:Iproduct | null = null;

  customOptions: OwlOptions = {
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
    items:1,
    nav: false
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        let idProduct = p.get('id');

        this.productsService.getSpecificProducts(idProduct).subscribe({
          next:(res)=>{
            console.log(res);
            this.productDetails = res.data;
          },
          error:(err)=>{
            console.log(err);
          }
        })

      }
    })
  }


  addToCart(id:string):void {
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          this.toastrService.success(res.message, 'Fresh cart');
          this.cartService.cartNumber.next(res.numOfCartItems);
        }
        
      }
    })
  }

}
