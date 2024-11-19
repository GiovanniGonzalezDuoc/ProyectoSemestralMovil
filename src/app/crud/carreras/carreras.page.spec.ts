import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrerasPage } from './carreras.page';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicebdService } from 'src/app/services/servicebd.service';

// Mock de ServicebdService
class ServicebdServiceMock {
  dbState() {
    return of(true);  // Simula que la base de datos está lista
  }

  fetchCarreras() {
    return of([{
      id_carrera: 1,
      nombre_carrera: 'Ingeniería en Sistemas'
    }]); // Simula la respuesta de carreras
  }

  eliminarCarrera(id_carrera: number) {
    return of(null); // Simula la eliminación de una carrera
  }
}

describe('CarrerasPage', () => {
  let component: CarrerasPage;
  let fixture: ComponentFixture<CarrerasPage>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [CarrerasPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: ServicebdService, useClass: ServicebdServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarrerasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Carga si la carrera no esta vacia y si tiene algun valor.', () => {
    // Esperar a que el componente cargue las carreras
    component.ngOnInit();
    
    // Comprobar que arregloCarrera tiene elementos
    expect(component.arregloCarrera.length).toBeGreaterThan(0);
    expect(component.arregloCarrera[0].nombre_carrera).toBe('Ingeniería en Sistemas');
  });

});
