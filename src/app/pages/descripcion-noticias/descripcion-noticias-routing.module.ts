import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescripcionNoticiasPage } from './descripcion-noticias.page';

const routes: Routes = [
  {
    path: '',
    component: DescripcionNoticiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescripcionNoticiasPageRoutingModule {}
