import * as AuthActions from './user.actions';

export interface AuthState {
    user: any;
    isLoggedIn: boolean;
    isAdmin: boolean;
}


const initialState = {
    user: null,
    isAdmin: false,
    isLoggedIn: false
};


export function AuthReducer(state= initialState, action: AuthActions.AuthActions){

    switch (action.type){
     case AuthActions.ADMIN_AUTHENTICATION:
         return {
             ...state,
             user: action.payload,
             isAdmin: true,
             isLoggedIn: true
         };
    case AuthActions.LOG_OUT:
        return {
            ...state,
            user: null,
            isAdmin: false,
            isLoggedIn: false
        };

    case AuthActions.USER_AUTHENTICATION:
        return {
            ...state,
            user: action.payload,
            isAdmin: false,
            isLoggedIn: true
        };
     default:
         return {
             ...state
         };
    }
}
