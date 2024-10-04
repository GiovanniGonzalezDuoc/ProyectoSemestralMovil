import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolPageRoutingModule } from './rol-routing.module';

import { RolPage } from './rol.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RolPage]
})
export class RolPageModule {}
