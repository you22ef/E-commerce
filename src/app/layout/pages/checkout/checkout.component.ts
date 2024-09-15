import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../../shared/services/checkout/checkout.service';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  isLoading:boolean = false;
  myCary!: string;
  constructor(private _CheckoutService:CheckoutService, private _ActivatedRoute:ActivatedRoute) { }
  ngOnInit(): void
  {
    this._ActivatedRoute.paramMap.subscribe((res:any)=>
    {
      console.log(res);
      this.myCary = res.params.id;
      
      
    }
    );
  }

  checkoutForm:FormGroup = new FormGroup({
    details: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required]),
    city: new FormControl(null,[Validators.required]),
  });

  checkoutApi()
  {
    this.isLoading = true;
    this._CheckoutService.checkout(this.myCary,this.checkoutForm.value).subscribe({
      next: (response) => {
        console.log(response);
        
        this.isLoading = false;
        window.open(response.session.url,'self'); 
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }
}
