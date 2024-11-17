import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PerfilSeguidorPage } from './perfil-seguidor.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Mock para ActivatedRoute
const activatedRouteMock = {
  queryParams: of({}),  // Puedes simular parámetros de consulta si es necesario
};

describe('PerfilSeguidorPage', () => {
  let component: PerfilSeguidorPage;
  let fixture: ComponentFixture<PerfilSeguidorPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(async () => {
    // Creamos un mock para el servicio ServicebdService
    serviceMock = jasmine.createSpyObj('ServicebdService', ['listarPublicacionesID', 'obtenerSeguidores', 'obtenerSeguidos']);

    // Configuramos el entorno de pruebas
    await TestBed.configureTestingModule({
      declarations: [PerfilSeguidorPage],
      imports: [
        IonicModule.forRoot(),
      ],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        NativeStorage,     // Proveedor de NativeStorage
        SQLite,            // Proveedor de SQLite
        provideAnimationsAsync(), // Proveedor de animaciones
        { provide: ActivatedRoute, useValue: activatedRouteMock } // Proveedor para ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilSeguidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba predeterminada
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
