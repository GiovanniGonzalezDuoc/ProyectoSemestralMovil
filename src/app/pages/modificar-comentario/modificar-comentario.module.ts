import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarComentarioPageRoutingModule } from './modificar-comentario-routing.module';

import { ModificarComentarioPage } from './modificar-comentario.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarComentarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarComentarioPage]
})
export class ModificarComentarioPageModule {}
