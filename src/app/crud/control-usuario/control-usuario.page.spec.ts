import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlUsuarioPage } from './control-usuario.page';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouteReuseStrategy } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

describe('ControlUsuarioPage', () => {
  let component: ControlUsuarioPage;
  let fixture: ComponentFixture<ControlUsuarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlUsuarioPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        AppRoutingModule
      ],
      providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideAnimationsAsync(),
        NativeStorage,
        SQLite
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ControlUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
