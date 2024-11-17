import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ModificarCarrerasPage } from './modificar-carreras.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ModificarCarrerasPage', () => {
  let component: ModificarCarrerasPage;
  let fixture: ComponentFixture<ModificarCarrerasPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let activatedRouteMock: any;

  beforeEach(() => {
    // Crear mocks para los servicios
    activatedRouteMock = {
      queryParams: of({ id: 1, nombre_carrera: 'Ingeniería' })  // Emitir valores correctos
    };
    serviceMock = jasmine.createSpyObj('ServicebdService', ['modificarCarrera']);

    TestBed.configureTestingModule({
      declarations: [ModificarCarrerasPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarCarrerasPage);
    component = fixture.componentInstance;

    // Detectar los cambios después de inicializar los mocks
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verificación de la creación del componente
  });
});
