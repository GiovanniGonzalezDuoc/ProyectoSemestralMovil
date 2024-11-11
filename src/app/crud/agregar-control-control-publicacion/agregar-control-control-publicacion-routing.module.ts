import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarControlControlPublicacionPage } from './agregar-control-control-publicacion.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarControlControlPublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarControlControlPublicacionPageRoutingModule {}
