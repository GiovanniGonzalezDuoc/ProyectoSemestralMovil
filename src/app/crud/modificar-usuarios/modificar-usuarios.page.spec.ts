import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ModificarUsuariosPage } from './modificar-usuarios.page';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { RouterTestingModule } from '@angular/router/testing'; // Importar RouterTestingModule para pruebas de enrutamiento

// Definición del test suite
describe('ModificarUsuariosPage', () => {
  let component: ModificarUsuariosPage;
  let fixture: ComponentFixture<ModificarUsuariosPage>;
  let activatedRouteMock: any;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(() => {
    // Mock de ActivatedRoute con queryParams
    activatedRouteMock = { queryParams: { subscribe: jasmine.createSpy().and.returnValue(of({})) } };

    // Mock del servicio
    serviceMock = jasmine.createSpyObj('ServicebdService', ['modificarUsuario']);

    // Configuración del TestBed
    TestBed.configureTestingModule({
      declarations: [ModificarUsuariosPage],
      imports: [IonicModule.forRoot(), RouterTestingModule], // Usar RouterTestingModule en lugar de un mock de Router
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });
});
