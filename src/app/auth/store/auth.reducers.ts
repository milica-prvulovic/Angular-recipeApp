import * as AuthActions from './auth.actions';
import { auth } from 'firebase';

export interface State {
    token: string;
    authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
};

export function authReducer(state= initialState, action: AuthActions.AuthAction) {
    switch(action.type) {
        case (AuthActions.SIGNUP):
        case (AuthActions.SIGNIN):
            return{
                ...state,
                authenticated: true
            };
        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            };
        default:
            return state;
    }
}