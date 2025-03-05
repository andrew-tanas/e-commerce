import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);

  cartDetails:Icart ={} as Icart;

  ngOnInit(): void {
    this.getCartData();
  }


  getCartData():void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  removeItem(id:string):void{
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data
        this.cartService.cartNumber.next(res.numOfCartItems)
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  updateCount(id:string, count:number):void{
    this.cartService.updateProductQuantity(id, count).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  clearItems():void{
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message === 'success'){
          this.cartDetails = {} as Icart
          this.cartService.cartNumber.next(0)
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
