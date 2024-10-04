import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlUsuarioPage } from './control-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ControlUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlUsuarioPageRoutingModule {}
