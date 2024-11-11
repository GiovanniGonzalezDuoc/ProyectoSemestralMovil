import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarControlComentariosPageRoutingModule } from './modificar-control-comentarios-routing.module';

import { ModificarControlComentariosPage } from './modificar-control-comentarios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarControlComentariosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarControlComentariosPage]
})
export class ModificarControlComentariosPageModule {}
