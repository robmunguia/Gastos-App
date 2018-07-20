import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import * as fromGastos from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[] = [];
  subscription: Subscription = new Subscription();

  constructor( private store: Store<fromGastos.AppState>,
              private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
              .subscribe( ingresoEgreso => {
                this.items = ingresoEgreso.items;
              });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem( ingresoEgreso: IngresoEgreso) {
    this.ingresoEgresoService.borrarIngresoEgreso( ingresoEgreso.uid )
      .then( () => {
        Swal('Eliminado', ingresoEgreso.descripcion, 'success');
      });
  }

}
