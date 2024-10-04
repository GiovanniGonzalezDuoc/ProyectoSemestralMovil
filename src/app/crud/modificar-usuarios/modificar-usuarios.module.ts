import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarUsuariosPageRoutingModule } from './modificar-usuarios-routing.module';

import { ModificarUsuariosPage } from './modificar-usuarios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarUsuariosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarUsuariosPage]
})
export class ModificarUsuariosPageModule {}
