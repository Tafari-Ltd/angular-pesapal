import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { PesapalPayModule } from 'projects/pesapal-pay/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PesapalPayModule.forRoot(
      'NbSbNpAJxxPcT3Yn36w5BqAEuRCWBykD',
      'GfxJU1ffnNDeZw5Guz7CfRPu+u0=',
      '2ad982cd-6de7-455b-adb1-dff6bfacaeb4'
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
