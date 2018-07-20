import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// Rutas hijas
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

// Modulos Personalizados
import { SharedModule } from '../shared/shared.module';

// Reducer
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature( 'ingresoEgreso', ingresoEgresoReducer )
  ],
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ],
  exports: [
  ]
})
export class IngresoEgresoModule { }
