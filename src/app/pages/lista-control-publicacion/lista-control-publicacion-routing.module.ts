import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaControlPublicacionPage } from './lista-control-publicacion.page';

const routes: Routes = [
  {
    path: '',
    component: ListaControlPublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaControlPublicacionPageRoutingModule {}
