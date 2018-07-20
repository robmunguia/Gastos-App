import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

import * as fromGastos from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';
  loading: boolean;
  subscription: Subscription = new Subscription();

  constructor( public ingresoEgreso: IngresoEgresoService,
              public store: Store<fromGastos.AppState> ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading );
    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required ),
      'monto': new FormControl(0, Validators.min(.01) )
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  crearIngresoEgreso() {

    this.store.dispatch( new ActivarLoadingAction() );

    const InregoEgres: IngresoEgreso = new IngresoEgreso({ ... this.forma.value, tipo: this.tipo });
    this.ingresoEgreso.crearIngresoEgreso( InregoEgres )
    .then(() => {
      this.store.dispatch( new DesactivarLoadingAction() );
      Swal('Creado', InregoEgres.descripcion, 'success');
    })
    .catch( err => {
      Swal('Error', err.message, 'error');
      this.store.dispatch( new DesactivarLoadingAction() );
    });
    this.forma.reset({ monto: 0 });

  }

}
