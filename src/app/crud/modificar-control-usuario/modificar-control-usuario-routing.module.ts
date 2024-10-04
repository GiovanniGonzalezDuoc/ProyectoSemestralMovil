import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarControlUsuarioPage } from './modificar-control-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarControlUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarControlUsuarioPageRoutingModule {}
