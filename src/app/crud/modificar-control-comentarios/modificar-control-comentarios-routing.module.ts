import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarControlComentariosPage } from './modificar-control-comentarios.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarControlComentariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarControlComentariosPageRoutingModule {}
