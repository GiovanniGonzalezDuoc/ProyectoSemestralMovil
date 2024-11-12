import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaControlComentarioPage } from './lista-control-comentario.page';

const routes: Routes = [
  {
    path: '',
    component: ListaControlComentarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaControlComentarioPageRoutingModule {}
