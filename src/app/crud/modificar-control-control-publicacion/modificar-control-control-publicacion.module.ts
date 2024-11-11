import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarControlControlPublicacionPageRoutingModule } from './modificar-control-control-publicacion-routing.module';

import { ModificarControlControlPublicacionPage } from './modificar-control-control-publicacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarControlControlPublicacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarControlControlPublicacionPage]
})
export class ModificarControlControlPublicacionPageModule {}
