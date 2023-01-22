# PesapalPayments


> This is an angular module that abstracts the complexity of making Pesapal payments with Angular.

## USAGE

### 1. Install the module
```sh
npm install pesapal-pay
```

 > Register your IPN URL [here](https://pay.pesapal.com/iframe/PesapalIframe3/IpnRegistration) 

### 2. Import the module
In your `app.module.ts` or any module where the component or directive would be used like so:

```ts
import { NgModule } from '@angular/core';

import { PesapalPayModule } from 'pesapal-pay';
...

@NgModule({
  imports: [
    PesapalPayModule.forRoot(
      "<your consumer key>",
      "<your consumer secret>",
      "<your IPN ID>"
    ),
  ]
})

export class AppModule {}
```


### 3. Implement in your application
  ```html
    <pesapal-pay
      [amount]="100"  
      [currency]="'KES'" 
      [description]="'Chips funga'" 
      [callback_url]="'http://localhost:4200/'" 
      [phone_number]="0712345678" 
      [email_address]="'test@mail.com'" 
      [styles]="{'background-color': 'pink', 'font-size': '16px'}"
      [button_text]="'Buy me coffee'"
    ></pesapal-pay>
  ```
   Clicking the button will render a Pesapal's payment iframe
  > For more information check out [Pesapal's documentation](https://developer.pesapal.com)



 ## PROPERTIES

| **Name**                            | **Default Value**                                                                       | **Required** | **Description**                                                                                                        |
|-------------------------------------|-----------------------------------------------------------------------------------------|--------------|------------------------------------------------------------------------------------------------------------------------|
| @Input() id: string                 | `Date.now().toString(36)` <br/> `Math.random()`<br/>`.toString(36)`<br/>`.substring(2)` | true         | Unique merchant reference                                                                                              |
| @Input() currency: string           | `KES`                                                                                   | true         | Transaction currency                                                                                                   |
| @Input() amount: number             | undefined                                                                               | true         | Amount to be processed.                                                                                                |
| @Input() description: string        | undefined                                                                               | true         | Order description. `maximum - 100 characters`                                                                          |
| @Input() callback_url: string       | undefined                                                                               | true         | A valid URL which Pesapal will redirect your clients to processing the payment.                                        |
| @Input() notification_id: string    | `IPN ID`                                                                                | true         | An IPN URL which Pesapal will send notifications to after payments have been processed.                                |
| @Input() phone_number: number       | undefined                                                                               | true         | Customer's phone number                                                                                                |
| @Input() email_address: string      | undefined                                                                               | true         | Customer's email address                                                                                               |
| @Input() country_code: string       | undefined                                                                               | false        | 2 characters long country code in `[ISO 3166-1]`                                                                       |
| @Input() first_name: string         | undefined                                                                               | false        | Customer's first name                                                                                                  |
| @Input() middle_name: string        | undefined                                                                               | false        | Customer's middle name                                                                                                 |
| @Input() last_name: string          | undefined                                                                               | false        | Customer's last name                                                                                                   |
| @Input() line_1: string             | undefined                                                                               | false        | Customer's main address                                                                                                |
| @Input() line_2: string             | undefined                                                                               | false        | Customer's alternative address                                                                                         |
| @Input() city: string               | undefined                                                                               | false        | Customer's city                                                                                                        |
| @Input() state: string              | undefined                                                                               | false        | Customer's state Maximum - `3 characters`                                                                              |
| @Input() postal_code: string        | undefined                                                                               | false        | Customer's postal code                                                                                                 |
| @Input() zip_code: string           | undefined                                                                               | false        | Customer's zip code                                                                                                    |
| @Input() cancellation_url: string   | undefined                                                                               | false        | A valid URL which Pesapal will redirect your clients to incase they click on cancel request while on the Payment link. |
| @Input() disabled: boolean          | `false`                                                                                 | false        | Whether the component is disabled.

                                                                                   |
| @Input() button_text: string        | `Pay with Pesapal`                                                                      | false        | Button text button                                                                                                     |
| @Input() class: string              | undefined                                                                               | false        | Button class name                                                                                                      |
| @Input() styles: any = {}           | undefined                                                                               | false        | CSS stylings, eg {fontColor: 'red'} (not available for inline embed)                                                   |
| @Input() iframe_width: string       | `600px`                                                                                 | false        | iframe width                                                                                                           |
| @Input() iframe_height: string      | `600px`                                                                                 | false        | iframe height                                                                                                          |





  ### 4. Example using Angular Forms
  In your `.ts` file,
  ```ts
    interface IFormGroup extends FormGroup {
    value: IForm
    controls: {
        currency: FormControl,
        amount: FormControl,
        description: FormControl
  }
  ...
   this['Paymentform'] = this.formBuilder.group({
      currency: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(256)]]
    }) as IFormGroup
}
  ```
In your `.html` file,

  ```html
    <form [formGroup]="Paymentform">
        <input [formControl]="form.controls.number" type="number" placeholder="amount">
        <input [formControl]="form.controls.currency" type="text" placeholder="currency">
        <input [formControl]="form.controls.description" type="text" placeholder="description">
          ...
        <pesapal-pay 
          [amount]="Paymentform.controls['amount'].value"  
          [currency]="Paymentform.controls['currency'].value" 
          [description]="Paymentform.controls['description'].value" 
        ...
        ></ppesapal-pay>
    </form>
  ```


### 5. Future changes
 - Automated tests
 - Check payment status