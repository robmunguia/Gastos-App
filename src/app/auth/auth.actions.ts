import { Action } from '@ngrx/store';
import { User } from './user.model';


export const SET_USER = '[AUTH] Set User';
export const UNSET_USER = '[AUTH] UnSet User';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor( public user: User ) { }
}

export class UnSetUserAction implements Action {
    readonly type = UNSET_USER;

}

export type acciones = SetUserAction | UnSetUserAction;
