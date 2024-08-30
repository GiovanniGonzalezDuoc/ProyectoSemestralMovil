import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescripcionPageRoutingModule } from './descripcion-routing.module';

import { DescripcionPage } from './descripcion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescripcionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DescripcionPage]
})
export class DescripcionPageModule {}
