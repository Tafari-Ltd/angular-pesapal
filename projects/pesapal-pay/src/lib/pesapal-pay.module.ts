import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PesapalPayComponent } from './pesapal-pay.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IframePipe } from './iframe.pipe';
import { PESAPAL_CONSUMERS } from './pesapal.token';
import { ErrorInterceptor } from './error.interceptor';
import { PesapalPayDirective } from './pesapal-pay.directive';
import { TemplateComponent } from './template/template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    IframePipe,
    TemplateComponent,
    PesapalPayComponent,
    PesapalPayDirective,
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // material
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatCheckboxModule,
  ],
  exports: [
    TemplateComponent,
    PesapalPayComponent,
    PesapalPayDirective,
    MatFormFieldModule,
    MatInputModule
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

