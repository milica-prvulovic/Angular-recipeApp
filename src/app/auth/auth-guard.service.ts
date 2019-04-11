import { CanActivate, ActivatedRouteSnapshot, RouteReuseStrategy, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<fromApp.AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth').map((authState: fromAuth.State) => {
          return authState.authenticated;  
        });
/*         .pipe(map((authState: fromAuth.State) => {
          return authState.authenticated;  
        })); */
    }
}