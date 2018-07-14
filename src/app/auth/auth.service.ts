import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
                private afDB: AngularFirestore,
                public router: Router ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {

      console.log(fbUser);

    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {

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
            this.router.navigate(['/']);
          });

    })
    .catch( error => {
      console.error(error);
      Swal('Error al Registrar', error.message, 'warning' );
    });

  }

  logIn ( email: string, password: string ) {

    this.afAuth.auth
    .signInWithEmailAndPassword( email, password )
    .then( resp => {

      this.router.navigate(['/']);

    })
    .catch( err => {
      console.error(err);
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
