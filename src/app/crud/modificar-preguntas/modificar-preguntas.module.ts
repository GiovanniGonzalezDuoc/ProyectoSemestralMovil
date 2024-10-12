import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPreguntasPageRoutingModule } from './modificar-preguntas-routing.module';

import { ModificarPreguntasPage } from './modificar-preguntas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPreguntasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarPreguntasPage]
})
export class ModificarPreguntasPageModule {}
