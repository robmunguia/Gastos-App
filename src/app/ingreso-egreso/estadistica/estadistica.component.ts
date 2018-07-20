import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number;
  susbscription: Subscription = new Subscription();
  doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  doughnutChartData: number[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.susbscription = this.store.select('ingresoEgreso')
                            .subscribe( ingresoEgreso => {
                              this.contarIngresoEgresos(ingresoEgreso.items);
                            });
  }

  ngOnDestroy() {
    this.susbscription.unsubscribe();
  }

  contarIngresoEgresos (items: IngresoEgreso[]) {

    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach( item => {

      if (item.tipo === 'ingreso') {
        this.cuantosIngresos++;
        this.ingresos += item.monto;
      } else if (item.tipo === 'egreso') {
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }

    });

    this.doughnutChartData = [ this.ingresos, this.egresos ];

  }

}
