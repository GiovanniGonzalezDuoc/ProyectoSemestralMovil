import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ModificarPreguntasPage } from './modificar-preguntas.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NavController } from '@ionic/angular'; // Importar NavController

describe('ModificarPreguntasPage', () => {
  let component: ModificarPreguntasPage;
  let fixture: ComponentFixture<ModificarPreguntasPage>;
  let activatedRouteMock: any;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let routerMock: jasmine.SpyObj<Router>; // Crear un mock para el Router
  let navControllerMock: jasmine.SpyObj<NavController>; // Crear un mock para NavController

  beforeEach(() => {
    // Mock de ActivatedRoute con queryParams
    activatedRouteMock = { queryParams: { subscribe: jasmine.createSpy().and.returnValue(of({})) } };

    // Mock del servicio
    serviceMock = jasmine.createSpyObj('ServicebdService', ['modificarPreguntas']);

    // Mock del Router
    routerMock = jasmine.createSpyObj('Router', ['getCurrentNavigation']);

    // Mock de NavController
    navControllerMock = jasmine.createSpyObj('NavController', ['navigateForward', 'navigateBack']);

    // Configuración del TestBed
    TestBed.configureTestingModule({
      declarations: [ModificarPreguntasPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock }, // Inyectar el mock del Router
        { provide: NavController, useValue: navControllerMock }, // Inyectar el mock de NavController
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPreguntasPage);
    component = fixture.componentInstance;

    // Simula un valor para 'pregunta' en el router state
    const navigationExtras: NavigationExtras = {
      state: {
        pregunta: { id_pregunta: 1, pregunta: 'Pregunta de prueba' }
      }
    };



    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se haya creado correctamente
  });
});
