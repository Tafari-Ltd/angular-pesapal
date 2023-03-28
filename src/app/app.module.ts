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
      'NbSbNpAJxxPcT3Yn36w5BqAEuRCWBykD',
      'GfxJU1ffnNDeZw5Guz7CfRPu+u0=',
      '3569a061-b604-4090-a7f3-dfe082817b9a'
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
