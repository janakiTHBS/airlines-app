import { Action } from '@ngrx/store';


export const ADMIN_AUTHENTICATION = 'ADMIN_AUTHENTICATION';
export const USER_AUTHENTICATION = 'USER_AUTHENTICATION';
export const LOG_OUT = 'LOG_OUT';

export class Authenticate implements Action {
    readonly type = ADMIN_AUTHENTICATION;
    constructor(public payload: any){}
}

export class Logout implements Action {
    readonly type = LOG_OUT;
}

export class UserAuth implements Action {
    readonly type = USER_AUTHENTICATION;
    constructor(public payload: any){}

}
export type AuthActions= Authenticate | Logout | UserAuth ;
