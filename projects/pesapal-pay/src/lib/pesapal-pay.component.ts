import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PesapalPayService } from './pesapal-pay.service';

@Component({
  selector: 'pesapal-pay',
  template: `
  <button class="pesapal-pay-button" (click)="makePayment()">Pay with Pesapal</button>

  <div *ngIf="$Url">
  <iframe width="600px" height="600px" [src]="$Url | safeUrl" frameborder="0"></iframe>
  </div>
  `,
  styles: [
  ],
})

export class PesapalPayComponent  {
  @Input() id: string = Date.now().toString(36) + Math.random().toString(36).substring(2)
  @Input() currency:string = 'KES'
  @Input() amount!: number
  @Input() description!: string
  @Input() callback_url!: string
  @Input() notification_id: string | any = localStorage.getItem("ipn")

  // billing address
  @Input() phone_number!: number
  @Input() email_address!: string
  @Input() country_code?: string
  @Input() first_name?: string
  @Input() middle_name?: string
  @Input() last_name?: string
  @Input() line_1?: string
  @Input() line_2?: string
  @Input() city?: string
  @Input() state?: string
  @Input() postal_code?: string
  @Input() zip_code?: string
  @Input() cancellation_url?: string


  $Url:string = ""


  constructor(
    private paymentService: PesapalPayService,
  ){}


  makePayment(){
    this.paymentService.AuthenticateEndpoint().subscribe({
      next: (res:any) => {},
      error: (e:any) => {
        throw new Error(e)
      }
    })

    this.paymentService.SubmitOrderRequest(
      {
        id: this.id,
        amount: this.amount,
        currency: this.currency,
        description: this.description,
        callback_url: this.callback_url,
        notification_id: this.notification_id,
        billing_address: {
          phone_number: this.phone_number,
          email_address: this.email_address,
          country_code: this.country_code,
          first_name: this.first_name,
          middle_name: this.middle_name,
          last_name: this.last_name,
          line_1: this.line_1,
          line_2: this.line_2,
          city: this.city,
          state: this.state,
          postal_code: this.postal_code,
          zip_code: this.zip_code
        }
      }
    ).subscribe({
      next: (res:any) => {
        // do something with tracking ID
        localStorage.setItem("PIUrl", res.redirect_url)
        this.$Url = res.redirect_url
        console.log(this.$Url)
        // this.dialog.open(PesapalIframeComponent, {
        //   height: '600px',
        //   width: '600px',
        //   data: {
        //     url: res.redirect_url,
        //   },
        // })
      },
      error: (e:any) => {
        throw new Error(e)
      }
    })
  }
}
