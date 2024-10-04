import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlUsuarioPageRoutingModule } from './control-usuario-routing.module';

import { ControlUsuarioPage } from './control-usuario.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlUsuarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ControlUsuarioPage]
})
export class ControlUsuarioPageModule {}
