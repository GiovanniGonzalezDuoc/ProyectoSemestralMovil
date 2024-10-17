import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilSeguidorPageRoutingModule } from './perfil-seguidor-routing.module';

import { PerfilSeguidorPage } from './perfil-seguidor.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilSeguidorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PerfilSeguidorPage]
})
export class PerfilSeguidorPageModule {}
