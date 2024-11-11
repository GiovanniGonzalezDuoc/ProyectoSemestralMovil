import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlControlPublicacionPageRoutingModule } from './control-control-publicacion-routing.module';

import { ControlControlPublicacionPage } from './control-control-publicacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlControlPublicacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ControlControlPublicacionPage]
})
export class ControlControlPublicacionPageModule {}
