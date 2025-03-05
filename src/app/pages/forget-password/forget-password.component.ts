import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading:boolean = false;
  messageError:string ="";
  isSuccess:string = "";

  step:number = 1;

  verifyEmailForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifyCodeForm:FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6}$/)]),
  });
  verifyResetPassword:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  });


  sendVerifyEmailForm():void{

    this.verifyResetPassword.get('email')?.patchValue(this.verifyEmailForm.get('email')?.value)

    if(this.verifyEmailForm.valid){
      this.isLoading = true;
      this.authService.postVerifyEmail(this.verifyEmailForm.value).subscribe({
        next:(res)=>{
          console.log(res);
        
          if(res.statusMsg === 'success'){
            this.step = 2;
          }
          this.isLoading = false;
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
          this.messageError = err.error.message;
        }
      })
    }
    else{
      this.verifyEmailForm.markAllAsTouched();
      this.isLoading = false;
    }
  }

  sendVerifyCodeForm():void{

    if(this.verifyCodeForm.valid){
      this.isLoading = true;
      this.authService.postVerifyCode(this.verifyCodeForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          if(res.status === 'Success'){
            console.log(res, " code")
            this.step = 3;
          }
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
          this.messageError = err.error.message
        }
      })
    }
    else{
      this.verifyEmailForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
  sendVerifyResetPasswordForm():void{
    if(this.verifyResetPassword.valid){
      this.isLoading = true;
      this.authService.putResetPassword(this.verifyResetPassword.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          console.log(res, " reset")
          localStorage.setItem('userToken', res.token);
          this.router.navigate(['/home']);
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
          this.messageError = err.error.message
        }
      })
    }
    else{
      this.verifyEmailForm.markAllAsTouched();
      this.isLoading = false;
    }


  }

}
