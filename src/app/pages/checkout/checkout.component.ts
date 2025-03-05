import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly ordersService = inject(OrdersService)


  isLoading:boolean = false;
  messageError:string ="";
  checkOutForm!:FormGroup ;
  cartId:string = "";


  ngOnInit(): void {

    this.initForm();
    this.getCartId();

  }

  initForm():void {
    this.checkOutForm = this.formBuilder.group({
      details:[null, [Validators.required]],
      phone:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null, [Validators.required]],
    })
  }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId = param.get('id') !;
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  submitForm():void{
    if(this.checkOutForm.valid){
      this.isLoading = true
      console.log(this.checkOutForm.value);
      console.log(this.cartId);
      this.ordersService.checkOutPayment(this.cartId, this.checkOutForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status === 'success'){
            open(res.session.url, '_self')
          }
          this.isLoading = false;
          
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
          
        }
      })
    }
    else{
      this.checkOutForm.markAllAsTouched();
      this.isLoading = false;
    }

    
  }

}
