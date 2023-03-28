import { Component, ElementRef, ViewChild, Renderer2, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PesapalPayService } from '../pesapal-pay.service';

export interface IForm {
  id: string,
  callback_url?: string
  currency?: string,
  amount?: number,
  description?: string
  first_name?:string
  last_name?:string
  email?: string
  phone_number?: number
  notification_id?: string
}

interface IFormGroup extends FormGroup {
  value: IForm
  controls: {
    id: FormControl,
    callback_url: FormControl
    currency: FormControl,
    amount: FormControl,
    description: FormControl,
    first_name: FormControl,
    last_name: FormControl,
    email_address: FormControl,
    phone_number: FormControl,
    notification_id?: FormControl
  }
}

export interface IPaymentOptions {
  name: string,
  value: string
}


@Component({
  selector: 'pesapal-template',
  template: `
    <div #page *ngIf="showModal" class="modal">
      <div class="modal-content">
      <form *ngIf="!$Url" [formGroup]="payForm"  [autocomplete]="'off'" id="commentform" class="comment-form">
                <mat-divider></mat-divider>
                <div class="comment-form-name">
                    <mat-form-field appearance="outline">
                        <mat-label>First Name</mat-label>
                        <input [formControl]="payForm.controls['first_name']" matInput placeholder="Ex. John ">
                        <mat-icon matPrefix>person</mat-icon>
                        <mat-error>Enter a valid name</mat-error>
                    </mat-form-field>
                </div>
                <div class="comment-form-surname">
                    <mat-form-field appearance="outline">
                        <mat-label>Last Name</mat-label>
                        <input [formControl]="payForm.controls['last_name']" matInput placeholder="Ex. Doe ">
                        <mat-icon matPrefix>person</mat-icon>
                        <mat-error>Enter a valid name</mat-error>
                    </mat-form-field>
                </div>
                <div class="comment-form-email">
                    <mat-form-field appearance="outline">
                        <mat-label>Email</mat-label>
                        <input [formControl]="payForm.controls['email_address']" matInput placeholder="Ex. john@mail.com ">
                        <mat-icon matPrefix>email</mat-icon>
                        <mat-error>Invalid email address</mat-error>
                    </mat-form-field>
                </div>
                <div class="comment-form-url">
                    <mat-form-field appearance="outline">
                        <mat-label>Phone Number</mat-label>
                        <input [formControl]="payForm.controls['phone_number']" type="number" matInput placeholder="Ex. 0712345678 ">
                        <mat-icon matPrefix>phone</mat-icon>
                        <mat-error>Enter a valid phone number</mat-error>
                    </mat-form-field>
                </div>
                <div class="comment-form-comment">
                    <mat-divider role="separator"></mat-divider>
                </div>
                <div class="comment-form-email hello">
                <mat-form-field appearance="outline">
                        <mat-label>Currency</mat-label>
                        <mat-select [formControl]="payForm.controls['currency']">
                            <mat-option *ngFor="let $ of options" [value]="$.value">
                                {{$.name}}
                            </mat-option>
                        </mat-select>
                        <mat-icon matPrefix>attach_money</mat-icon>
                        <mat-error>Please select the currency</mat-error>
                    </mat-form-field>
                </div>
                <div class="comment-form-url">
                    <mat-form-field appearance="outline">
                        <mat-label>Amount</mat-label>
                        <input [formControl]="payForm.controls['amount']" type="number" #amount matInput placeholder="Ex. 300 ">
                        <mat-error>Invalid amount</mat-error>
                    </mat-form-field>
                </div>
                <div class="comment-form-comment">
                    <mat-form-field appearance="outline">
                        <mat-label>Description</mat-label>
                        <textarea [formControl]="payForm.controls.description"  #description matInput placeholder="Ex. Making a payment for... "></textarea>
                        <mat-hint *ngIf="description.value.length <=100" align="end">{{description.value.length}} / 100</mat-hint>
                        <mat-hint *ngIf="description.value.length> 100" align="end"><span [style.color]="'red'">{{description.value.length}}</span> / 100</mat-hint>
                        <mat-icon matPrefix>description</mat-icon>
                    </mat-form-field>
                    <button [disabled]="!payForm.valid" color="primary" mat-raised-button (click)="click()">{{payText}}</button>
                </div>
                <div class="form-submit">
                </div>
            </form>
            <div class="iframe" *ngIf="$Url">
            <mat-icon [style.cursor]="'pointer'" (click)="makePayment()"  matPrefix>refresh</mat-icon>
              <iframe height="100%" width="100%" [src]="$Url" frameborder="0"></iframe>
            </div>
      </div>
    </div>

    <button [style.width]="'auto'" [ngClass]="class" [ngStyle]="styles" [disabled]="disabled" #toggleButton (click)="openModal()">{{buttonText}}</button>

  `,
  styles: [`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      animation: backgroundFade .5s;
      @keyframes backgroundFade {
        0%   {
          background-color: rgba(255,255,255);
        }
        100%   {
          background-color: rgba(0,0,0,0.5);
        }
      }
    }

    .modal-content {
      background-color: white;
      padding: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.26);
      width: 50%;
      height: 50%;
      overflow: auto;
      max-height: 600px;
      max-width: 680px;
    }

    @media (max-width: 319px) {
      .modal-content {
        width: 90%;
        height: 90%;
      }
    }

    @media (min-width: 320px) and (max-width: 767px) {
      .modal-content {
        width: 80%;
        height: 80%;
      }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      .modal-content {
        width: 60%;
        height: 60%;
      }
    }

    @media (min-width: 1024px) {
      .modal-content {
        width: 50%;
        height: 50%;
      }
    }
    .iframe{
      height: 100%;
    }
    .example-stretched-tabs {
        max-width: 800px;
    }

    .example-spacer {
        flex: 1 1 auto;
    }

    .example-stretched-tabs {
        max-width: 900px;
    }

    .body {
        width: 50%;
        margin: 0 auto;
        padding-top: 20px;
    }

    .padding {
        padding: 20px;
    }

    mat-card {
        margin-bottom: 55px;
    }

    footer {
        padding-top: 50px;
    }

    .mat-mdc-form-field {
        width: 100%;
    }


    /* General Styles */

    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }


    /* Layout Stuff */

    #commentform {
        /*     display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox; */
        display: flex;
        /*     -webkit-flex-wrap: wrap;
                -ms-flex-wrap: wrap; */
        flex-wrap: wrap;
    }

    #commentform>[class^="comment-form"] {
        position: relative;
        min-height: 1px;
        padding: 15px;
        width: 100%;
        -webkit-box-flex: 0;
        -webkit-flex: 0 0 100%;
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%;
    }

    @media (min-width: 900px) {
        #commentform>.comment-form-name,
        #commentform>.comment-form-surname,
        #commentform>.comment-form-email,
        #commentform>.comment-form-url {
            -webkit-box-flex: 0;
            -webkit-flex: 0 0 50%;
            -ms-flex: 0 0 50%;
            flex: 0 0 50%;
            max-width: 50%;
        }
    }

    @media (max-width: 900px) {
        .body {
            width: 100% !important;
        }
        mat-card {
            box-shadow: 0px 1px 3px 0px rgb(0 0 0 / 12%) !important;
            border-radius: 0 !important;
        }
        button {
            width: 100%;
        }
    }

    @media (min-width: 901px) and (max-width: 1300px) {
        .body {
            width: 90% !important;
        }
    }

    @media (min-width: 1301px) {
        .body {
            width: 50% !important;
        }
    }

    form {
        padding: 10px;
    }

    .form-submit {
        width: 100%;
    }

    a {
        color: #8aa3ff;
    }
    /* // scrollbar color */

    ::-webkit-scrollbar {
        width: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background: #414040;
    }

    ::-webkit-scrollbar-track {
        background: rgb(150, 150, 150);
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgba(56, 11, 11, 0.385);
    }
  `]
})

export class TemplateComponent {
  $Url!: SafeUrl
  $Errormessages:any
  payForm!: IFormGroup
  showModal: boolean = false

  @ViewChild('toggleButton') toggleButton!: ElementRef
  @ViewChild('page') page!: ElementRef
  

  options: IPaymentOptions[] = [
    { name:"Kenyan Shilling", value:"KES" },
    { name:"US Dollar", value:"USD" },
    { name:"Euro", value:"EUR" },
    { name:"Great Britain Pound", value:"GBP" },
    { name:"Ugandan Shilling", value:"UGX" },
    { name:"Tanzanian Shilling", value:"TZX" },
  ]   

  // payment inputs
  @Input() id: string = Date.now().toString(36) + Math.random().toString(36).substring(2)
  @Input() notification_id: string | any = localStorage.getItem("ipn")
  @Input() currency:string = ''
  @Input() callback_url!: string
  @Input() amount!: number
  @Input() buttonText: string = "Pay with Pesapal"
  @Input() payText: string = "Pay with Pesapal"
  @Input() class?: string 
  @Input() styles?: any = {}
  @Input() disabled: boolean = false


  constructor(
    private render: Renderer2,
    private sanitizer: DomSanitizer,
    private formbuilder: FormBuilder,
    private host: ElementRef<HTMLElement>,
    private paymentService: PesapalPayService,
  )
  {
    this.authenticateKeys()
    this.initForm()
    this.render.listen('window', 'click',(e:Event)=>{
     if( e.target !== this.toggleButton?.nativeElement && e.target! == this.page?.nativeElement ){
         this.showModal = false
     }
    })
  }

  initForm(){
    this.payForm = this.formbuilder.group({
      currency: [this.currency, Validators.required],
      amount: [this.amount, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      email_address: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
    }) as IFormGroup
  }

  authenticateKeys(){
    this.paymentService.AuthenticateEndpoint().subscribe({
      next: () => {
        this.$Errormessages = JSON.stringify(this.paymentService.$Errormessages) 
      },
      error: (e:any) => {
        throw new Error(e)
      }
    })
  }

  
  makePayment(){
    this.authenticateKeys()
    this.paymentService.SubmitOrderRequest({
        id: this.id,
        callback_url: this.callback_url,
        notification_id: this.notification_id,
        amount: this.payForm.get('amount')?.value,
        currency: this.payForm.get('currency')?.value,
        description: this.payForm.get('description')?.value,
        billing_address: {
          phone_number: this.payForm.get('phone_number')?.value,
          email_address: this.payForm.get('email_address')?.value,
          first_name: this.payForm.get('first_name')?.value,
          last_name: this.payForm.get('last_name')?.value,
        }
      }).subscribe({
      next: (res:any) => {
        // do something with tracking ID
        if (res.status == '500'){
          this.$Errormessages = JSON.stringify(res)
        }
        this.$Url = this.sanitizer.bypassSecurityTrustResourceUrl(res.redirect_url)

      },
      error: () => {}
    })
  }


  openModal() {
    this.showModal = true
  }

  click(){
    this.makePayment()
  }
}
