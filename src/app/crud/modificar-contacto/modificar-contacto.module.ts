import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarContactoPageRoutingModule } from './modificar-contacto-routing.module';

import { ModificarContactoPage } from './modificar-contacto.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarContactoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarContactoPage]
})
export class ModificarContactoPageModule {}
