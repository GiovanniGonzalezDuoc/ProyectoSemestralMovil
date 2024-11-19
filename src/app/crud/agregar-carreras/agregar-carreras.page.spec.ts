import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCarrerasPage } from './agregar-carreras.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs'; // Para simular respuestas si es necesario

describe('AgregarCarrerasPage', () => {
  let component: AgregarCarrerasPage;
  let fixture: ComponentFixture<AgregarCarrerasPage>;
  let mockServicebdService: jasmine.SpyObj<ServicebdService>;

  beforeEach(() => {
    // Crear un espía (mock) del servicio ServicebdService
    mockServicebdService = jasmine.createSpyObj('ServicebdService', ['insertarCarrera']);

    // Configurar el TestBed
    TestBed.configureTestingModule({
      declarations: [ AgregarCarrerasPage ],
      providers: [
        { provide: ServicebdService, useValue: mockServicebdService } // Usar el mock del servicio
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarCarrerasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Prueba que inserta una carrera.', () => {
    // Establecer un valor para nombre_carrera
    component.nombre_carrera = 'Ingeniería';

    // Llamar al método insertar
    component.insertar();

    // Verificar que insertarCarrera ha sido llamado con el valor adecuado
    expect(mockServicebdService.insertarCarrera).toHaveBeenCalledWith('Ingeniería');
  });
});
