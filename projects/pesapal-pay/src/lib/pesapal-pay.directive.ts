import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { PesapalPayService } from './pesapal-pay.service';

@Directive({
  selector: '[pesapal-pay]',
})
export class PesapalPayDirective {
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
  @Input() errorMessages: boolean = false


  // configs
  // @Input() disabled: boolean = false
  // @Input() button_text: string = "Pay with Pesapal"
  // @Input() class?: string 
  // @Input() styles?: any = {}
  @Input() iframe_width: string = "600px"
  @Input() iframe_height: string = "600px"

  private div!: HTMLElement
  private div2!: HTMLElement
  $Url:string = ""
  $Errormessages:any

  constructor(
    private el: ElementRef,
    private paymentService: PesapalPayService,
  ){
    this.paymentService.AuthenticateEndpoint().subscribe({
      error: (e:any) => {
        throw new Error(e)
      }
    })
    this.div = document.createElement('div');
    this.div.innerHTML = `<iframe class="pesapal-iframe" src="" frameborder="0"></iframe>`
    this.div.style.display = 'none'
    this.el.nativeElement.parentNode.appendChild(this.div)

    this.div2 = document.createElement('div');
    this.div2.style.display = 'none'
    this.el.nativeElement.parentNode.appendChild(this.div2)
  }

  @HostListener('click', ['$event']) onClick(event:any) {
    this.makePayment()
    this.div.style.display = 'block';
    if (this.errorMessages == true){
      this.div2.style.display = 'block';
    }
  }

  makePayment(){
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
        if (res.status == '500'){
          this.$Errormessages = JSON.stringify(res)
          this.errorDiv()
        }
        else {
          // do something with tracking ID
        localStorage.setItem("PIUrl", res.redirect_url)
        const $Url = res.redirect_url
        // if (this.sanitizer.sanitize(SecurityContext.URL, $Url) !== $Url) {
        //   console.log("URL is not sanitized")
        // } else {
        //   console.log("URL is sanitized")
        // }
        this.div.querySelector(".pesapal-iframe")?.setAttribute("src", $Url)
        this.div.querySelector(".pesapal-iframe")?.setAttribute("width", this.iframe_width)
        this.div.querySelector(".pesapal-iframe")?.setAttribute("height", this.iframe_height)
        }
      },
      error: (e:any) => {
        throw new Error(e)
      }
    })
  }

  errorDiv(){
    this.div.style.display = 'none'
    this.div2.style.width = 'fit-content'
    this.div2.style.background = '#e1e1e1'
    this.div2.style.fontFamily = 'monospace'
    this.div2.innerHTML = `
      <div class="pesapal-error-div">
      <pre>message:<code>${this.$Errormessages}</code></pre>
      </div>
      `
  }
}
