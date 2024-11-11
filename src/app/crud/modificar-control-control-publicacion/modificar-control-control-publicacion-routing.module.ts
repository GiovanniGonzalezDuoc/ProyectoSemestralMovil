import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarControlControlPublicacionPage } from './modificar-control-control-publicacion.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarControlControlPublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarControlControlPublicacionPageRoutingModule {}
