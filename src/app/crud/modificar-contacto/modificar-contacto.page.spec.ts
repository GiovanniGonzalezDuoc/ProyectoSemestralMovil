import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarContactoPage } from './modificar-contacto.page';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';

describe('ModificarContactoPage', () => {
  let component: ModificarContactoPage;
  let fixture: ComponentFixture<ModificarContactoPage>;
  let activatedRouteMock: any;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(() => {
    // Crear un mock de ActivatedRoute
    activatedRouteMock = {
      queryParams: of({}) // Este valor se puede ajustar dependiendo de lo que necesites
    };

    // Crear un mock para el servicio
    serviceMock = jasmine.createSpyObj('ServicebdService', ['modificarContacto']);

    // Configurar TestBed
    TestBed.configureTestingModule({
      declarations: [ModificarContactoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarContactoPage);
    component = fixture.componentInstance;

    // Inyectar valores para la propiedad 'contacto' del componente
    component.contacto = { id_contacto: 1, correo_usuario_contacto: 'test@example.com', mensaje_contacto: 'Hello' };

    // Detectar cambios después de establecer los valores
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verificación de la creación del componente
  });
});
