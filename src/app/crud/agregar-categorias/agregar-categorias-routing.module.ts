import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarCategoriasPage } from './agregar-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarCategoriasPageRoutingModule {}
