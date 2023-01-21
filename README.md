# PesapalPayments


> This is an angular module that abstracts the complexity of making Pesapal payments with Angular14+.

## USAGE

### 1. Install the module
```sh
npm install pesapal-payments
```

Register your IPN URL [here](https://pay.pesapal.com/iframe/PesapalIframe3/IpnRegistration) 

### 2. Import the module
In your `app.module.ts` or any module where the component or directive would be used like so:

```ts
import { NgModule } from '@angular/core';

import { PesapalPaymentsModule } from 'pesapal-payments';
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
      [first_name]="''" 
      [middle_name]="''"
      [line_1]="" 
      [line_2]="" 
      [city]="" 
      [state]="" 
      [postal_code]="" 
      [zip_code]="" 
      [cancellation_url]=""
    ></pesapal-pay>
  ```
   Clicking the button will render a dialog popup with Pesapal's payment iframe
  > For more information check out [Pesapal's documentation](https://developer.pesapal.com)

  ## OPTIONS

| Name       | Default Value                                                     |
|------------|-------------------------------------------------------------------|
| `id`       | Date.now().toString(36) + Math.random().toString(36).substring(2) |
| `currency` | 'KES'                                                             |


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
        <pesapal-payment-button 
          [amount]="Paymentform.controls['amount'].value"  
          [currency]="Paymentform.controls['currency'].value" 
          [description]="Paymentform.controls['description'].value" 
        ...
        ></pesapal-payment-button>
    </form>
  ```


### 5. Future changes
 - Automated tests
 - Check payment status