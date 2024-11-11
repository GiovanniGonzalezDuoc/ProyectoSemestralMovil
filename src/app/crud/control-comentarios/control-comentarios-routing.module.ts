import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlComentariosPage } from './control-comentarios.page';

const routes: Routes = [
  {
    path: '',
    component: ControlComentariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlComentariosPageRoutingModule {}
