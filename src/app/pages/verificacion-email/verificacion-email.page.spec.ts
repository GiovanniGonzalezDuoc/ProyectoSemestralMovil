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
});
