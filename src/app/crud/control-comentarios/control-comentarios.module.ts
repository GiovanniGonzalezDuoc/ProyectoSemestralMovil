import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlComentariosPageRoutingModule } from './control-comentarios-routing.module';

import { ControlComentariosPage } from './control-comentarios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlComentariosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ControlComentariosPage]
})
export class ControlComentariosPageModule {}
