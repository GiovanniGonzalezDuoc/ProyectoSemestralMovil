import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoSeguidoresPage } from './listado-seguidores.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoSeguidoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoSeguidoresPageRoutingModule {}
