import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }

  myToken = localStorage.getItem('userToken') !;

  checkOutPayment(id:string, data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,{
    
      "shippingAddress": data
  
    },
    {
      headers:{
        token: this.myToken
      }
    })
  }
}
