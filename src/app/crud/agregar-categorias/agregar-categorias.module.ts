import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarCategoriasPageRoutingModule } from './agregar-categorias-routing.module';

import { AgregarCategoriasPage } from './agregar-categorias.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarCategoriasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgregarCategoriasPage]
})
export class AgregarCategoriasPageModule {}
