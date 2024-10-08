import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaContrasenaPageRoutingModule } from './nueva-contrasena-routing.module';

import { NuevaContrasenaPage } from './nueva-contrasena.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaContrasenaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NuevaContrasenaPage]
})
export class NuevaContrasenaPageModule {}
