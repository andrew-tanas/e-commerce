import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(private httpClient:HttpClient) { }

    getAllSubcategories(id:string):Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}/subcategories`)
    }
    getSpecificSubcategories(id:string):Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/v1/subcategories/${id}`)
    }
}
