import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  private readonly router = inject(Router);

  userData:any = null;

  sendRegisterForm(registerdData:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,registerdData )
  }
  sendLoginForm(loginData:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,loginData )
  }

  saveUserData():void{
    if(localStorage.getItem('userToken') !== null){
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  logOut():void{
    localStorage.removeItem('userToken');
    this.userData = null;
    this.router.navigate(['/login']);
  }

  postVerifyEmail(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }

  postVerifyCode(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }

  putResetPassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data);
  }

}
