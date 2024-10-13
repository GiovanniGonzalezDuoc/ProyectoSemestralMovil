import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarCarrerasPageRoutingModule } from './modificar-carreras-routing.module';

import { ModificarCarrerasPage } from './modificar-carreras.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarCarrerasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarCarrerasPage]
})
export class ModificarCarrerasPageModule {}
