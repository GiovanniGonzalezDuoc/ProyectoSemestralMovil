import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CRUDPageRoutingModule } from './crud-routing.module';

import { CRUDPage } from './crud.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CRUDPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CRUDPage]
})
export class CRUDPageModule {}
