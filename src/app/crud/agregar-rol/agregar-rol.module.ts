import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarRolPageRoutingModule } from './agregar-rol-routing.module';

import { AgregarRolPage } from './agregar-rol.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarRolPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgregarRolPage]
})
export class AgregarRolPageModule {}
