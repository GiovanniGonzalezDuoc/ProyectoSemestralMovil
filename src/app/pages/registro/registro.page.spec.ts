import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let routerMock: jasmine.SpyObj<Router>;
  let mockNativeStorage: jasmine.SpyObj<NativeStorage>;

  beforeEach(() => {
    // Crear mocks para los servicios
    serviceMock = jasmine.createSpyObj('ServicebdService', ['fetchPreguntas', 'fetchCarreras', 'insertarUsuario', 'verificarEmail']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    mockNativeStorage = jasmine.createSpyObj('NativeStorage', ['getItem']);
    mockNativeStorage.getItem.and.returnValue(Promise.resolve('12345')); // Devuelve una promesa resuelta con un valor simulado

    // Simulamos que fetchPreguntas devuelve un observable con las preguntas
    serviceMock.fetchPreguntas.and.returnValue(of());
    // Simulamos que fetchCarreras devuelve un observable con las carreras
    serviceMock.fetchCarreras.and.returnValue(of());

    // Simulamos que insertarUsuario devuelve una promesa resuelta
    serviceMock.insertarUsuario.and.returnValue(Promise.resolve());

    // Configuración del TestBed
    TestBed.configureTestingModule({
      declarations: [RegistroPage],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        { provide: NativeStorage, useValue: mockNativeStorage },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Verificar Que Nombre Usuario y Apellido Usuario No Este Vacio.', async () => {
    // Rellenamos el formulario con valores vacíos
    component.arregloUsuario = {
      nombre_usuario: '',  // Campo vacío
      apellido_usuario: '',  // Campo vacío
    };
  
    // Llamamos al método de verificación
    const result = component.verificarEspacios();
  
    // Verificamos el resultado de la validación
    expect(result).toBe(false);
    expect(component.errorNombre).toBe('El nombre no puede quedar vacio.');
    expect(component.errorApellido).toBe('El apellido no puede quedar vacio.');
  });
});
