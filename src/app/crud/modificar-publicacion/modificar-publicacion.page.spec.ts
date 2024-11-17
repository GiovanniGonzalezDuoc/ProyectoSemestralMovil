import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { ModificarPublicacionPage } from './modificar-publicacion.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { RouterTestingModule } from '@angular/router/testing'; // Importar RouterTestingModule para pruebas de enrutamiento

describe('ModificarPublicacionPage', () => {
  let component: ModificarPublicacionPage;
  let fixture: ComponentFixture<ModificarPublicacionPage>;
  let activatedRouteMock: any;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let navControllerMock: jasmine.SpyObj<NavController>; // Crear un mock para NavController

  beforeEach(() => {
    // Mock de ActivatedRoute con queryParams
    activatedRouteMock = { queryParams: { subscribe: jasmine.createSpy().and.returnValue(of({})) } };

    // Mock del servicio
    serviceMock = jasmine.createSpyObj('ServicebdService', ['modificarPublicacion']);

    // Mock de NavController
    navControllerMock = jasmine.createSpyObj('NavController', ['navigateForward', 'navigateBack']);

    // Configuración del TestBed
    TestBed.configureTestingModule({
      declarations: [ModificarPublicacionPage],
      imports: [IonicModule.forRoot(), RouterTestingModule], // Usar RouterTestingModule en lugar de un mock de Router
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: NavController, useValue: navControllerMock }, // Inyectar el mock de NavController
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPublicacionPage);
    component = fixture.componentInstance;

    // Simula un valor para 'publicacion' en el router state
    const navigationExtras: NavigationExtras = {
      state: {
        publicacion: { id_publicacion: 1, titulo_publicacion: 'Título de prueba', descripcion_publicacion: 'Descripción de prueba' }
      }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se haya creado correctamente
  });
});
