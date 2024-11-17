import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificacionEmailPage } from './verificacion-email.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('VerificacionEmailPage', () => {
  let component: VerificacionEmailPage;
  let fixture: ComponentFixture<VerificacionEmailPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Crear mocks para los servicios
    serviceMock = jasmine.createSpyObj('ServicebdService', [
      'fetchPreguntas', 'verificarEmail', 'verificarRespuesta', 'presentAlert', 'presentToast'
    ]);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    // Simulamos que fetchPreguntas devuelve un Observable vacío o con datos simulados
    serviceMock.fetchPreguntas.and.returnValue(of([]));

    // Configuración del TestBed
    TestBed.configureTestingModule({
      declarations: [VerificacionEmailPage],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificacionEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email format and show alert if invalid', async () => {
    component.emailsolicitado = 'invalid-email';
    await component.Email();
    
    expect(serviceMock.presentAlert).toHaveBeenCalledWith(
      'El Correo No Cumple Con Las Reglas', 
      'El correo electrónico no es válido.'
    );
  });

  it('should show alert if email does not exist in the database', async () => {
    component.emailsolicitado = 'nonexistent@email.com';
    serviceMock.verificarEmail.and.returnValue(Promise.resolve(false));

    await component.Email();

    expect(serviceMock.presentAlert).toHaveBeenCalledWith(
      'Error En El Correo',
      'El Correo No Existe En La Base De Datos.'
    );
  });

  it('should navigate to nueva-contrasena if everything is correct', async () => {
    component.emailsolicitado = 'test@email.com';
    component.preguntaSeleccionada = 1;
    component.respuesta = 'correct answer';
    serviceMock.verificarEmail.and.returnValue(Promise.resolve(true));
    serviceMock.verificarRespuesta.and.returnValue(Promise.resolve(true));

    await component.Email();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/nueva-contrasena'], {
      state: { email: 'test@email.com' }
    });
    expect(serviceMock.presentToast).toHaveBeenCalledWith('bottom', 'Revise su correo Electrónico.');
  });
});
