import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarControlControlPublicacionPageRoutingModule } from './agregar-control-control-publicacion-routing.module';

import { AgregarControlControlPublicacionPage } from './agregar-control-control-publicacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarControlControlPublicacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgregarControlControlPublicacionPage]
})
export class AgregarControlControlPublicacionPageModule {}
