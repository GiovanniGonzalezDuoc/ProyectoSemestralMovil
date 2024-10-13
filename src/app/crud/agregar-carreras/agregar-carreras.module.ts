import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarCarrerasPageRoutingModule } from './agregar-carreras-routing.module';

import { AgregarCarrerasPage } from './agregar-carreras.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarCarrerasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgregarCarrerasPage]
})
export class AgregarCarrerasPageModule {}
