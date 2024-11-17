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

  it('should load carreras on init', () => {
    component.ngOnInit();
    expect(component.arregloCarrera).toEqual([{
      id_carrera: 1,
      nombre_carrera: 'Ingeniería en Sistemas'
    }]);
  });

  it('should navigate to agregar-carreras on agregar', () => {
    component.agregar();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/crud/agregar-carreras']);
  });

  it('should call eliminarCarrera when eliminar is triggered', () => {
    const carrera = { id_carrera: 1, nombre_carrera: 'Ingeniería en Sistemas' };
    spyOn(component['bd'], 'eliminarCarrera').and.callThrough(); // Espiar el método de eliminación
    component.eliminar(carrera);
    expect(component['bd'].eliminarCarrera).toHaveBeenCalledWith(carrera.id_carrera);
  });

  it('should navigate to modificar-carreras when modificar is triggered', () => {
    const carrera = { id_carrera: 1, nombre_carrera: 'Ingeniería en Sistemas' };
    component.modificar(carrera);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/crud/modificar-carreras'], {
      state: { carrera }
    });
  });
});
