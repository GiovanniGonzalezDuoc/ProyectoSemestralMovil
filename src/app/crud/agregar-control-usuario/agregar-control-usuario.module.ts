import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarControlUsuarioPageRoutingModule } from './agregar-control-usuario-routing.module';

import { AgregarControlUsuarioPage } from './agregar-control-usuario.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarControlUsuarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgregarControlUsuarioPage]
})
export class AgregarControlUsuarioPageModule {}
