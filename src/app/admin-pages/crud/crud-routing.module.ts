import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CRUDPage } from './crud.page';

const routes: Routes = [
  {
    path: '',
    component: CRUDPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CRUDPageRoutingModule {}
