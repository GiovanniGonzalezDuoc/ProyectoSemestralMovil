import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoSeguidoresPageRoutingModule } from './listado-seguidores-routing.module';

import { ListadoSeguidoresPage } from './listado-seguidores.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoSeguidoresPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListadoSeguidoresPage]
})
export class ListadoSeguidoresPageModule {}
