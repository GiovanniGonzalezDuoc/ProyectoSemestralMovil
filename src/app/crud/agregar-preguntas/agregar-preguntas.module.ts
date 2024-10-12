import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPreguntasPageRoutingModule } from './agregar-preguntas-routing.module';

import { AgregarPreguntasPage } from './agregar-preguntas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPreguntasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgregarPreguntasPage]
})
export class AgregarPreguntasPageModule {}
