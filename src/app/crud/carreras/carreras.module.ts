import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarrerasPageRoutingModule } from './carreras-routing.module';

import { CarrerasPage } from './carreras.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarrerasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CarrerasPage]
})
export class CarrerasPageModule {}
