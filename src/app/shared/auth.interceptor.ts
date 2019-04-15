import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as formApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import 'rxjs/add/operator/switchMap';
import { take } from 'rxjs/operators';

@Injectable ()
export class AuthInterceptor implements HttpInterceptor {
    constructor (private store: Store<formApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);
        // const copiedReq = req.clone({headers: req.headers.set('','')});
        return this.store.select('auth')
        .pipe(take(1))
        .switchMap((authState: fromAuth.State) => {
            const copiedReq = req.clone({params: req.params.set('auth',authState.token)});
            return next.handle(copiedReq);
        })
       // return null;
    }
}