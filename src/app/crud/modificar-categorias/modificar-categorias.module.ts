import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarCategoriasPageRoutingModule } from './modificar-categorias-routing.module';

import { ModificarCategoriasPage } from './modificar-categorias.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarCategoriasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarCategoriasPage]
})
export class ModificarCategoriasPageModule {}
