import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AgregarPreguntasPage } from './agregar-preguntas.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('AgregarPreguntasPage', () => {
  let component: AgregarPreguntasPage;
  let fixture: ComponentFixture<AgregarPreguntasPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(async () => {
    // Creamos un mock para el servicio ServicebdService
    serviceMock = jasmine.createSpyObj('ServicebdService', ['insertarPreguntas']);

    // Configuramos el entorno de pruebas
    await TestBed.configureTestingModule({
      declarations: [AgregarPreguntasPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,       // Importamos FormsModule para trabajar con formularios
        HttpClientModule   // Importamos HttpClientModule para peticiones HTTP
      ],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        NativeStorage,     // Proveedor de NativeStorage
        SQLite,            // Proveedor de SQLite
        provideAnimationsAsync() // Proveedor de animaciones
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarPreguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba predeterminada
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
