import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlControlPublicacionPage } from './control-control-publicacion.page';

const routes: Routes = [
  {
    path: '',
    component: ControlControlPublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlControlPublicacionPageRoutingModule {}
