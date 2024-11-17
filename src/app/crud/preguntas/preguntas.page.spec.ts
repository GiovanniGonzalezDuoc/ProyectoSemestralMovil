import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PreguntasPage } from './preguntas.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('PreguntasPage', () => {
  let component: PreguntasPage;
  let fixture: ComponentFixture<PreguntasPage>;
  let routerMock: any;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(() => {
    // Mock del Router
    routerMock = { navigate: jasmine.createSpy() };

    // Mock del servicio
    serviceMock = jasmine.createSpyObj('ServicebdService', ['dbState', 'fetchPreguntas', 'eliminarPreguntas']);
    serviceMock.dbState.and.returnValue(of(true)); // Simula que la base de datos está lista
    serviceMock.fetchPreguntas.and.returnValue(of([{ id_pregunta: 1, pregunta: 'Pregunta 1' }])); // Simula datos de prueba

    TestBed.configureTestingModule({
      declarations: [PreguntasPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ServicebdService, useValue: serviceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch questions on ngOnInit when db is ready', () => {
    expect(serviceMock.dbState).toHaveBeenCalled();
    expect(serviceMock.fetchPreguntas).toHaveBeenCalled();
    expect(component.arregloPreguntas.length).toBe(1);
    expect(component.arregloPreguntas[0].pregunta).toBe('Pregunta 1');
  });

  it('should navigate to modify page with correct state', () => {
    const question = { id_pregunta: 1, pregunta: 'Pregunta 1' };
    component.modificar(question);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/crud/modificar-preguntas'], {
      state: { pregunta: question },
    });
  });

  it('should call eliminarPreguntas on eliminar', () => {
    const question = { id_pregunta: 1 };
    component.eliminar(question);
    expect(serviceMock.eliminarPreguntas).toHaveBeenCalledWith(1);
  });

  it('should navigate to add page on agregar', () => {
    component.agregar();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/crud/agregar-preguntas']);
  });
});
