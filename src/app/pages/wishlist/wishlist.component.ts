import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{

    private readonly wishlistService = inject(WishlistService);
    private readonly cartService = inject(CartService);
    private readonly toastrService = inject(ToastrService);
  
    wishlistDetails:Iwishlist[] =[];

    ngOnInit(): void {
      this.getWishlistData();
    }

      getWishlistData():void {
        this.wishlistService.getLoggedUserWishlist().subscribe({
          next:(res)=>{
            console.log(res.data);
            this.wishlistDetails = res.data;
            
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      }
    
      removeItem(id:string):void{
        this.wishlistService.removeSpecificWishlistItem(id).subscribe({
          next:(res)=>{
            console.log(res);
            this.wishlistDetails = res.data
            // this.wishlistService.wishlistNumber.set(res.numOfWishlistItems)
            
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

}
