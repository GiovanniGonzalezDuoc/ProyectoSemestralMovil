import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarContactoPageRoutingModule } from './agregar-contacto-routing.module';

import { AgregarContactoPage } from './agregar-contacto.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarContactoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgregarContactoPage]
})
export class AgregarContactoPageModule {}
