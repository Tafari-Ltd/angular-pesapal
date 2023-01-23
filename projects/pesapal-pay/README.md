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
 There are two available options

* **PesapalPayComponent**: Renders a button which when clicked loads Pesapal in an iframe
```html
<pesapal-pay
  [amount]="100"  
  [currency]="'KES'" 
  [description]="'chapo'" 
  [callback_url]="'http://localhost:4200/'" 
  [phone_number]="0712345678" 
  [email_address]="'test@mail.com'" 
  [styles]="{'background-color': 'pink', 'font-size': '16px'}"
  [button_text]="'Buy me coffee'"
></pesapal-pay>
```

*  **PesapalPayDirective**: A directive that loads Pesapal in an iframe when clicked
```html
<button
  pesapal-pay
  [amount]="100"  
  [currency]="'KES'" 
  [description]="'mandazi'" 
  [callback_url]="'http://localhost:4200/'" 
  [phone_number]="0712345678" 
  [email_address]="'test@mail.com'" 
>Pay with Pesapal
</button>
```
  > For more information check out [Pesapal's documentation](https://developer.pesapal.com)



 ## PROPERTIES


<table>
    <tr>
        <td>Name</td>
        <td>Default Value</td>
        <td>Required</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>@Input() id: string</td>
        <td>Date.now().toString(36)<br>.Math.random()<br>.toString(36)<br>.substring(2)</td>
        <td>true</td>
        <td>Unique merchant reference</td>
    </tr>
    <tr>
        <td>@Input() currency: string</td>
        <td>`KES`</td>
        <td>true</td>
        <td>Transaction currency </td>
    </tr>
    <tr>
        <td>@Input() amount: number</td>
        <td>undefined</td>
        <td>true</td>
        <td>Amount to be processed. </td>
    </tr>
    <tr>
        <td>@Input() description: string</td>
        <td>undefined</td>
        <td>true</td>
        <td>Order description. `maximum - 100 characters`</td>
    </tr>
    <tr>
        <td>@Input() callback_url: string</td>
        <td>undefined</td>
        <td>true</td>
        <td>A valid URL which Pesapal will redirect your clients to processing the payment.</td>
    </tr>
    <tr>
        <td>@Input() notification_id: string</td>
        <td>`IPN ID`</td>
        <td>true</td>
        <td>An IPN URL which Pesapal will send notifications to after payments have been processed.</td>
    </tr>
    <tr>
        <td>@Input() phone_number: number</td>
        <td>undefined</td>
        <td>true</td>
        <td>Customer's phone number </td>
    </tr>
    <tr>
        <td>@Input() email_address: string </td>
        <td>undefined</td>
        <td>true</td>
        <td>Customer's email address </td>
    </tr>
    <tr>
        <td>@Input() country_code: string </td>
        <td>undefined</td>
        <td>false</td>
        <td>2 characters long country code in `[ISO 3166-1]`</td>
    </tr>
    <tr>
        <td>@Input() first_name: string </td>
        <td>undefined</td>
        <td>false</td>
        <td>Customer's first name </td>
    </tr>
    <tr>
        <td>@Input() middle_name: string </td>
        <td>undefined</td>
        <td>false</td>
        <td>Customer's middle name</td>
    </tr>
    <tr>
        <td>@Input() last_name: string</td>
        <td>undefined</td>
        <td>false</td>
        <td>Customer's last name </td>
    </tr>
    <tr>
        <td>@Input() line_1: string</td>
        <td>undefined</td>
        <td>false</td>
        <td>Customer's main address</td>
    </tr>
    <tr>
        <td>@Input() line_2: string </td>
        <td>undefined</td>
        <td>false</td>
        <td>Customer's alternative address</td>
    </tr>
    <tr>
        <td>@Input() city: string </td>
        <td>undefined</td>
        <td>false</td>
        <td>Customer's city </td>
    </tr>
    <tr>
        <td>@Input() state: string</td>
        <td>undefined</td>
        <td>false</td>
        <td>Customer's state Maximum - `3 characters` </td>
    </tr>
    <tr>
        <td>@Input() postal_code: string  </td>
        <td>undefined</td>
        <td>false</td>
        <td>Customer's postal code </td>
    </tr>
    <tr>
        <td>@Input() zip_code: string  </td>
        <td>undefined</td>
        <td>false</td>
        <td>Customer's zip code </td>
    </tr>
    <tr>
        <td>@Input() cancellation_url: string  </td>
        <td>undefined</td>
        <td>false</td>
        <td>A valid URL which Pesapal will redirect your clients to incase they click on cancel request while on the Payment link.</td>
    </tr>
    <tr>
        <td>@Input() disabled: boolean </td>
        <td>`false`</td>
        <td>false</td>
        <td>Whether the component is disabled.

</td>
    </tr>
    <tr>
        <td>@Input() button_text: string</td>
        <td>`Pay with Pesapal`</td>
        <td>false</td>
        <td>Button text button</td>
    </tr>
    <tr>
        <td>@Input() class: string </td>
        <td>undefined</td>
        <td>false</td>
        <td>Button class name</td>
    </tr>
    <tr>
        <td>@Input() styles: object</td>
        <td>{}</td>
        <td>false</td>
        <td>CSS stylings, eg {fontColor: 'red'} (not available for inline embed)</td>
    </tr>
    <tr>
        <td>@Input() iframe_width: string</td>
        <td>`600px`</td>
        <td>false</td>
        <td>iframe width</td>
    </tr>
    <tr>
        <td>@Input() iframe_height: string </td>
        <td>`600px`</td>
        <td>false</td>
        <td>iframe height</td>
    </tr>
</table>


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
