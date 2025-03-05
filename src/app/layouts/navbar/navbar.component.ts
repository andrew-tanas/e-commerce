import { CartService } from './../../core/services/cart/cart.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, computed, inject, input, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly cartService = inject(CartService)

  countCart:Signal<number> = computed(()=> this.cartService.cartNumber());


  ngOnInit(): void {
    // this.cartService.cartNumber.subscribe({
    //   next:(value)=>{
    //     this.countCart = value
    //   }
    // })
    this.refreshCartItemsCount();
    
  }

  refreshCartItemsCount():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{

        // console.log(res);
        
        this.cartService.cartNumber.set(res.numOfCartItems);
      }
    })
  }

  AuthService(AuthService: any) {
    throw new Error('Method not implemented.');
  }

  isLogin = input<boolean>(true);
  readonly authService = inject(AuthService);


}
