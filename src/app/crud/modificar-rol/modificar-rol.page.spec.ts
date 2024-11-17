import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { ModificarRolPage } from './modificar-rol.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { RouterTestingModule } from '@angular/router/testing'; // Importar RouterTestingModule para pruebas de enrutamiento

describe('ModificarRolPage', () => {
  let component: ModificarRolPage;
  let fixture: ComponentFixture<ModificarRolPage>;
  let activatedRouteMock: any;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let navControllerMock: jasmine.SpyObj<NavController>; // Crear un mock para NavController

  beforeEach(() => {
    // Mock de ActivatedRoute con queryParams
    activatedRouteMock = { queryParams: { subscribe: jasmine.createSpy().and.returnValue(of({})) } };

    // Mock del servicio
    serviceMock = jasmine.createSpyObj('ServicebdService', ['modificarRol']);

    // Mock de NavController
    navControllerMock = jasmine.createSpyObj('NavController', ['navigateForward', 'navigateBack']);

    // Configuración del TestBed
    TestBed.configureTestingModule({
      declarations: [ModificarRolPage],
      imports: [IonicModule.forRoot(), RouterTestingModule], // Usar RouterTestingModule en lugar de un mock de Router
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: NavController, useValue: navControllerMock }, // Inyectar el mock de NavController
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarRolPage);
    component = fixture.componentInstance;

    // Simula un valor para 'rol' en el router state
    const navigationExtras: NavigationExtras = {
      state: {
        rol: { id_rol: 1, nombre_rol: 'Rol de prueba' }
      }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });
});
