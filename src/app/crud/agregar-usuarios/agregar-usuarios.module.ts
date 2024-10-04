import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarUsuariosPageRoutingModule } from './agregar-usuarios-routing.module';

import { AgregarUsuariosPage } from './agregar-usuarios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarUsuariosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgregarUsuariosPage]
})
export class AgregarUsuariosPageModule {}
