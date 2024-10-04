import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarControlUsuarioPageRoutingModule } from './modificar-control-usuario-routing.module';

import { ModificarControlUsuarioPage } from './modificar-control-usuario.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarControlUsuarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarControlUsuarioPage]
})
export class ModificarControlUsuarioPageModule {}
