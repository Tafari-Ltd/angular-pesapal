import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError, retry } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1), //retry 2 times on error
      catchError((error:HttpErrorResponse) =>{
        if (error.status === 404){
          return throwError("Failure fetching data. Kindly refresh your browser")
        } else {
          return throwError("Something went wrong. Kindly refresh page")
        }
      })
    )
  }
}
