import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescripcionNoticiasPageRoutingModule } from './descripcion-noticias-routing.module';

import { DescripcionNoticiasPage } from './descripcion-noticias.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescripcionNoticiasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DescripcionNoticiasPage]
})
export class DescripcionNoticiasPageModule {}
