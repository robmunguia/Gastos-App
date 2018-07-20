import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemAction, UnsetItemAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubs: Subscription = new Subscription();
  ingresoEgresoItemsListenerSubs: Subscription = new Subscription();

  constructor( private afDB: AngularFirestore,
              private authService: AuthService,
            private store: Store<AppState> ) { }


  initIngresoEgresoListener () {

    this.ingresoEgresoListenerSubs = this.store.select('user')
                                    .pipe(
                                      filter( auth => auth.user != null )
                                    )
                                    .subscribe( auth => {
                                      this.ingresoEgresoItem(auth.user.uid);
                                    });
  }

  private ingresoEgresoItem ( uid: string ) {

    this.ingresoEgresoItemsListenerSubs = this.afDB.collection( `${ uid }/ingresos-egresos/items` )
            .snapshotChanges()
            .pipe(
              map( docData => {

                return docData.map( doc => {
                  return {
                    uid: doc.payload.doc.id,
                    ...doc.payload.doc.data()
                  };
                });

              })
            )
            .subscribe( (collection: any[]) => {
              this.store.dispatch( new SetItemAction( collection ) );
            });

  }

  cancelarSubscripciones () {
    this.ingresoEgresoItemsListenerSubs.unsubscribe();
    this.ingresoEgresoListenerSubs.unsubscribe();
    this.store.dispatch( new UnsetItemAction() );
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {

    const user = this.authService.getUsuario();

    return this.afDB.doc(`${ user.uid }/ingresos-egresos`)
          .collection('items').add({ ... ingresoEgreso });

  }

  borrarIngresoEgreso( uid: string ) {

    const user = this.authService.getUsuario();
    return this.afDB.doc(`${ user.uid }/ingresos-egresos/items/${ uid }`)
        .delete();


  }


}
