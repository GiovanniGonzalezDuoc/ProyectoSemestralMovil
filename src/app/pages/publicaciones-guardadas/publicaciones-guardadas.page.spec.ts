import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PublicacionesGuardadasPage } from './publicaciones-guardadas.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';  // Aseguramos de importar 'of' para crear observables simulados

describe('PublicacionesGuardadasPage', () => {
  let component: PublicacionesGuardadasPage;
  let fixture: ComponentFixture<PublicacionesGuardadasPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(async () => {
    // Creamos un mock para el servicio ServicebdService
    serviceMock = jasmine.createSpyObj('ServicebdService', [
      'listarGuardado',
      'listarPublicaciones',
      'fetchPublicacion',
      'obtenerSeguidores',
      'obtenerSeguidos',
      'dbState', // Aseguramos de que el método 'dbState' esté en el mock
    ]);

    // Simulamos la respuesta de dbState para devolver un observable
    serviceMock.dbState.and.returnValue(of(true));

    // Configuramos el entorno de pruebas
    await TestBed.configureTestingModule({
      declarations: [PublicacionesGuardadasPage],
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

    fixture = TestBed.createComponent(PublicacionesGuardadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba predeterminada
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
