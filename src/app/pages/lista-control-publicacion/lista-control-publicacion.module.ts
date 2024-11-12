import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaControlPublicacionPageRoutingModule } from './lista-control-publicacion-routing.module';

import { ListaControlPublicacionPage } from './lista-control-publicacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaControlPublicacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaControlPublicacionPage]
})
export class ListaControlPublicacionPageModule {}
