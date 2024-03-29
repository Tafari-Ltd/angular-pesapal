import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PesapalPayModule } from 'projects/pesapal-pay/src/lib/pesapal-pay.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// import { PesapalPayModule } from 'projects/pesapal-pay/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PesapalPayModule.forRoot(
      '',
      '',
      ''
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
