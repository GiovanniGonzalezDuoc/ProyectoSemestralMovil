import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderAdminComponent } from './header-admin/header-admin.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderAdminComponent
  ],
  exports:[
    HeaderComponent,
    HeaderAdminComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class ComponentsModule { }
