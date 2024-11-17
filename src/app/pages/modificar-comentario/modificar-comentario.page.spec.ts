import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarComentarioPage } from './modificar-comentario.page';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

// Mocks para los servicios
const routerMock = {
  navigate: jasmine.createSpy('navigate'),
  getCurrentNavigation: jasmine.createSpy('getCurrentNavigation').and.returnValue({
    extras: {
      state: { comentario: { id_comentario: 1, nombre_usuario_comentario: 'Usuario', comentario_publicacion: 'Comentario' } }
    }
  })
};

const activatedRouteMock = {
  queryParams: of({})  // Simulamos un observable vacío aquí para `queryParams`
};

const nativeStorageMock = jasmine.createSpyObj('NativeStorage', ['getItem']);
nativeStorageMock.getItem.and.returnValue(Promise.resolve(1));

const servicebdServiceMock = jasmine.createSpyObj('ServicebdService', ['modificarComentario']);

describe('ModificarComentarioPage', () => {
  let component: ModificarComentarioPage;
  let fixture: ComponentFixture<ModificarComentarioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarComentarioPage],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: NativeStorage, useValue: nativeStorageMock },
        { provide: ServicebdService, useValue: servicebdServiceMock },
      ]
    });

    fixture = TestBed.createComponent(ModificarComentarioPage);
    component = fixture.componentInstance;

    // Asegurarse de que el comentario está inicializado
    component.arregloComentario = { id_comentario: 1, nombre_usuario_comentario: 'Usuario', comentario_publicacion: 'Comentario' };
    
    fixture.detectChanges(); // Fuerza la detección de cambios después de la asignación
  });

  // Prueba básica
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize comentario correctly', () => {
    expect(component.arregloComentario).toEqual({ id_comentario: 1, nombre_usuario_comentario: 'Usuario', comentario_publicacion: 'Comentario' });
  });
});
