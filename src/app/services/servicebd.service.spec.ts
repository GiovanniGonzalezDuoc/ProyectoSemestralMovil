import { TestBed } from '@angular/core/testing';

import { ServicebdService } from './servicebd.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouteReuseStrategy } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';
import { HeaderComponent } from '../components/header/header.component';
import { HomePage } from '../home/home.page';

describe('ServicebdService', () => {
  let service: ServicebdService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [HomePage,HeaderComponent],
      imports: [IonicModule.forRoot(),FormsModule,HttpClientModule,ComponentsModule,AppRoutingModule],
      providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(),NativeStorage,SQLite],
    }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
