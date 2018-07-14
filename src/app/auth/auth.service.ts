import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction,
        DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

import { User } from './user.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscripcion: Subscription = new Subscription();

  constructor( private afAuth: AngularFireAuth,
                private afDB: AngularFirestore,
                private store: Store<AppState>,
                public router: Router ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {

      if ( fbUser ) {
        this.userSubscripcion = this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges()
              .subscribe( (usuarioObj: any) => {

                const newUser = new User( usuarioObj );
                this.store.dispatch( new SetUserAction( newUser ) );

              });
      } else {
        this.userSubscripcion.unsubscribe();
      }

    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {

    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth
    .createUserWithEmailAndPassword( email, password )
    .then( resp => {

      const user: User = {
        uid: resp.user.uid,
        nombre: nombre,
        email: resp.user.email
      };

      this.afDB.doc( `${ user.uid }/usuario` )
          .set( user )
          .then( () => {
            this.store.dispatch( new DesactivarLoadingAction() );
            this.router.navigate(['/']);
          });

    })
    .catch( error => {
      this.store.dispatch( new DesactivarLoadingAction() );
      Swal('Error al Registrar', error.message, 'warning' );
    });

  }

  logIn ( email: string, password: string ) {

    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth
    .signInWithEmailAndPassword( email, password )
    .then( resp => {
      this.store.dispatch( new DesactivarLoadingAction() );
      this.router.navigate(['/']);

    })
    .catch( err => {
      this.store.dispatch( new DesactivarLoadingAction() );
      Swal('Error al Iniciar', err.message, 'warning' );
    });

  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.afAuth.authState
    .pipe(
      map(
        fbUser => {

          if (fbUser == null) {
            this.router.navigate(['/login']);
          }

          return fbUser != null;
      })
    );
  }

}
