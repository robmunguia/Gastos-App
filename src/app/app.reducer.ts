import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
// import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';


export interface AppState {
    ui: fromUI.State;
    user: fromAuth.AuthState;
    // ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {

    ui: fromUI.uiReducer,
    user: fromAuth.authReducer
    // ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer

};
