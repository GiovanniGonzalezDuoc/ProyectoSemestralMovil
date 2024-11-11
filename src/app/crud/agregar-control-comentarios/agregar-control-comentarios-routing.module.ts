import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarControlComentariosPage } from './agregar-control-comentarios.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarControlComentariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarControlComentariosPageRoutingModule {}
