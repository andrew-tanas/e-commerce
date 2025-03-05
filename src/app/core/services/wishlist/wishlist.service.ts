import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient:HttpClient) { }

    wishlistNumber:WritableSignal<number> = signal(0);

    addProductToWishlist(id:string):Observable<any>{
      return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
        "productId": id
      }
    );
    }
  
    getLoggedUserWishlist():Observable<any> {
      return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
    }
  
    removeSpecificWishlistItem(id:string):Observable<any> {
      return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
    }
  

}
