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
    PesapalPaymentsModule.forRoot(
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
      [description]="'helllo Pesapal'" 
      [callback_url]="'http://localhost:4200/'" 
      [phone_number]="0712345678" 
      [email_address]="'test@mail.com'" 
      [last_name]="''" 
      [country_code]="''"
      [first_name]="''" 
      [middle_name]="''"
      [line_1]="''" 
      [line_2]="''" 
      [city]="''" 
      [state]="''" 
      [postal_code]="''" 
      [zip_code]="''" 
      [cancellation_url]="''"
      [disabled]="false"
      [button_text]="'Donate'"
      [class]="''"
      [styles]="{'background-color': 'pink', 'font-size': '16px'}"
      [iframe_width]="''"
      [iframe_height]="''"
    ></pesapal-pay>
  ```
   Clicking the button will render a dialog popup with Pesapal's payment iframe
  > For more information check out [Pesapal's documentation](https://developer.pesapal.com)

  ## OPTIONS

| Name           | Default Value                                                     |
|----------------|-------------------------------------------------------------------|
| `id`           | Date.now().toString(36) + Math.random().toString(36).substring(2) |
| `currency`     | 'KES'                                                             |
| `button_text`  | 'Pay with Pesapal'                                                |
| `iframe_width` | '600px'                                                           |
| `iframe_height`| '600px'                                                           |


 ## PROPERTIES

|Name                            |Description                          |
|--------------------------------|-------------------------------------|
| @Input() disabled: boolean     | Whether the component is disabled  |
| @Input() button_text: string   | Button text to be displayed         |
| @Input() class: string         | Button's class name                 |
| @Input() styles: any           | Custom button styles                |
| @Input() iframe_width: string  | iframe width                        |
| @Input() iframe_height: string | iframe height                       |



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