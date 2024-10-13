import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarCarrerasPage } from './modificar-carreras.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarCarrerasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarCarrerasPageRoutingModule {}
