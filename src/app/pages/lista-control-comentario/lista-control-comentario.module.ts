import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaControlComentarioPageRoutingModule } from './lista-control-comentario-routing.module';

import { ListaControlComentarioPage } from './lista-control-comentario.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaControlComentarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaControlComentarioPage]
})
export class ListaControlComentarioPageModule {}
