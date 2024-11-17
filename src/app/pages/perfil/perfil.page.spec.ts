import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PerfilPage } from './perfil.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(async () => {
    // Creamos un mock para el servicio ServicebdService
    serviceMock = jasmine.createSpyObj('ServicebdService', ['listarPublicacionesID', 'obtenerSeguidores', 'obtenerSeguidos', 'dbState']);

    // Simulamos la respuesta para dbState
    serviceMock.dbState.and.returnValue(of(true));
    // Configuramos el entorno de pruebas
    await TestBed.configureTestingModule({
      declarations: [PerfilPage],
      imports: [
        IonicModule.forRoot(),
      ],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        NativeStorage,     // Proveedor de NativeStorage
        SQLite,            // Proveedor de SQLite
        provideAnimationsAsync() // Proveedor de animaciones
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba predeterminada
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
