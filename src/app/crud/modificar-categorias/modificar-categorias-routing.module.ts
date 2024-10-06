import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarCategoriasPage } from './modificar-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarCategoriasPageRoutingModule {}
