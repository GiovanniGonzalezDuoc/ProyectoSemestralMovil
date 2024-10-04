import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPublicacionPageRoutingModule } from './modificar-publicacion-routing.module';

import { ModificarPublicacionPage } from './modificar-publicacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPublicacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarPublicacionPage]
})
export class ModificarPublicacionPageModule {}
