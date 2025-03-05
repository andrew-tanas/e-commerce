import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  isLoading:boolean = false;
  messageError:string ="";
  isSuccess:string = "";


  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  });

  submitForm():void{
    if(this.loginForm.valid){
      this.isLoading = true
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.message == 'success'){
            localStorage.setItem('userToken', res.token);
            this.authService.saveUserData();
            console.log('user data: ',this.authService.userData);

            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 500);
            this.isSuccess = res.message;
          }
          this.isLoading = false;
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          this.messageError = err.error.message
          this.isLoading = false;
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched();
    }

  }


}
