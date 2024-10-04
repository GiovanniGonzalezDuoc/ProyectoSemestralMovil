import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarControlUsuarioPage } from './agregar-control-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarControlUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarControlUsuarioPageRoutingModule {}
