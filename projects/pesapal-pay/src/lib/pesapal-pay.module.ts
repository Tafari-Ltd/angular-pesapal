import { ModuleWithProviders, NgModule } from '@angular/core';
import { PesapalPayComponent } from './pesapal-pay.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CommonModule } from '@angular/common';

import { IframePipe } from './iframe.pipe';
import { PESAPAL_CONSUMERS } from './pesapal.token';
import { ErrorInterceptor } from './error.interceptor';




@NgModule({
  declarations: [
    IframePipe,
    PesapalPayComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    PesapalPayComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class PesapalPayModule { 
  static forRoot(consumer_key:string, consumer_secret:string, ipn_id:string): ModuleWithProviders<PesapalPayModule> {
    return {
      ngModule: PesapalPayModule,
      providers: [
        { provide: PESAPAL_CONSUMERS, useValue: { consumer_key, consumer_secret, ipn_id } },
      ]
    }
  }
}

