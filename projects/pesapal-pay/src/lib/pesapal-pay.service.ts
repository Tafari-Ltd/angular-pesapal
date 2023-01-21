import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {  IKeys, IPayments } from './pesapal.data';
import { PESAPAL_CONSUMERS } from './pesapal.token';

@Injectable({
  providedIn: 'root'
})
export class PesapalPayService {

  constructor(
    private http: HttpClient,
    @Inject(PESAPAL_CONSUMERS) private token: any,
  ) {
    console.log(token)
    localStorage.setItem("ipn", token.ipn_id)
   }

  AuthenticateEndpoint(): Observable<any> {
    return this.http.post<IKeys>(`
    https://pay.pesapal.com/v3/api/Auth/RequestToken`,
    {
      consumer_key: this.token.consumer_key,
      consumer_secret: this.token.consumer_secret
    }
    ).pipe(map((res:any)=>{
      // console.log("res:", res)
      localStorage.setItem("Ptoken", res.token)
    }))
  }


  SubmitOrderRequest(data:any): Observable<IPayments> {
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('Ptoken')}`)
    return this.http.post<IPayments>(
      `https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest`,
      data, 
      {headers: headers}
      )
  }
}

