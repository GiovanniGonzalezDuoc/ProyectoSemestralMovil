import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarCarrerasPage } from './agregar-carreras.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarCarrerasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarCarrerasPageRoutingModule {}
