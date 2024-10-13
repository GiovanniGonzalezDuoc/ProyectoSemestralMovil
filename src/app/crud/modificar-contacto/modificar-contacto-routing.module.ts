import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarContactoPage } from './modificar-contacto.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarContactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarContactoPageRoutingModule {}
