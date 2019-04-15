import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthAction from './store/auth.actions';

@Injectable()
export class AuthService {
    constructor(private router: Router, private store: Store<fromApp.AppState>) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            user => {
                this.store.dispatch(new AuthAction.Signup());
            }
        )
        .catch (
            error => console.log(error) 
        )
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                this.store.dispatch(new AuthAction.Signin());
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => {
                            this.store.dispatch(new AuthAction.SetToken());//on je stavio u SetToken(token), bez tokena nema greske
                        }
                    )
            }
        )
        .catch(
            error => console.log(error)
            
        );
    }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthAction.Logout());
    }

}