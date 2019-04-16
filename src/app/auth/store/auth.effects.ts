import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {mergeMap} from 'rxjs/operators';

import { fromPromise} from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
    .pipe(ofType(AuthActions.TRY_SIGNUP))
    .map((action: AuthActions.TrySignup) => {
        return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
        return fromPromise(firebase.auth().createUserWithEmailAndPassword(
            authData.username , authData.password));
    })
    .switchMap(() => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .pipe(mergeMap((token: string) => {
        return [
            {
                type: AuthActions.SIGNUP
            },
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            }
        ];
    }));

    @Effect()
    authSignin = this.actions$
    .pipe(ofType(AuthActions.TRY_SIGNIN))
    .map((action: AuthActions.TrySignup) => {
        return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
        return fromPromise(firebase.auth().signInWithEmailAndPassword(
            authData.username , authData.password));
    })
    .switchMap(() => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .pipe(mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
            {
                type: AuthActions.SIGNIN
            },
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            }
        ];
    }));

    @Effect({dispatch: false})
    authLogout = this.actions$
    .pipe(ofType(AuthActions.LOGOUT))
    .do(() => {
        this.router.navigate(['/']);
    });

    constructor( private actions$: Actions, private router: Router ) {
    }
}