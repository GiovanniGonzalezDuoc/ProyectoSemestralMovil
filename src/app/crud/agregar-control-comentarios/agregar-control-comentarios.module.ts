import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarControlComentariosPageRoutingModule } from './agregar-control-comentarios-routing.module';

import { AgregarControlComentariosPage } from './agregar-control-comentarios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarControlComentariosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgregarControlComentariosPage]
})
export class AgregarControlComentariosPageModule {}
