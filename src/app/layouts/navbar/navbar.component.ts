import { CartService } from './../../core/services/cart/cart.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly cartService = inject(CartService)

  countCart!:number;


  ngOnInit(): void {
    this.cartService.cartNumber.subscribe({
      next:(value)=>{
        this.countCart = value
        this.refreshCartItemsCount()
      }
    })
    
  }

  refreshCartItemsCount():void{
    this.cartService.cartNumber.subscribe({
      next:(res)=>{
        this.cartService.cartNumber.next(res);
      }
    })
  }

  AuthService(AuthService: any) {
    throw new Error('Method not implemented.');
  }

  isLogin = input<boolean>(true);
  readonly authService = inject(AuthService);


}
