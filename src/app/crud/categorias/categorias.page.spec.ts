import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasPage } from './categorias.page';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { RouterTestingModule } from '@angular/router/testing';

// Mock del servicio ServicebdService
class ServicebdServiceMock {
  dbState() {
    return of(true);  // Simula que la base de datos está lista
  }

  fetchCategorias() {
    return of([{
      id_categoria: 1,
      nombre_categoria: 'Tecnología'
    }]); // Simula la respuesta de categorías
  }

  elimarCategoria(id_categoria: number) {
    return of(null); // Simula la eliminación de una categoría
  }
}

describe('CategoriasPage', () => {
  let component: CategoriasPage;
  let fixture: ComponentFixture<CategoriasPage>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [CategoriasPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: ServicebdService, useClass: ServicebdServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categorias on init', () => {
    component.ngOnInit();
    expect(component.arregloCategoria).toEqual([{
      id_categoria: 1,
      nombre_categoria: 'Tecnología'
    }]);
  });

  it('should navigate to agregar-categorias on agregar', () => {
    component.agregar();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/crud/agregar-categorias']);
  });

  it('should call eliminarCategoria when eliminar is triggered', () => {
    const categoria = { id_categoria: 1, nombre_categoria: 'Tecnología' };
    spyOn(component['bd'], 'elimarCategoria').and.callThrough(); // Espiar el método de eliminación
    component.eliminar(categoria);
    expect(component['bd'].elimarCategoria).toHaveBeenCalledWith(categoria.id_categoria);
  });

  it('should navigate to modificar-categorias when modificar is triggered', () => {
    const categoria = { id_categoria: 1, nombre_categoria: 'Tecnología' };
    component.modificar(categoria);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/crud/modificar-categorias'], {
      state: { categoria }
    });
  });
});
