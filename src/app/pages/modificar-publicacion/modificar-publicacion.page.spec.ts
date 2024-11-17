import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarPublicacionPage } from './modificar-publicacion.page';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

// Mocks para los servicios
const routerMock = {
  navigate: jasmine.createSpy('navigate')
};

const activatedRouteMock = {
  queryParams: {
    subscribe: jasmine.createSpy('subscribe')
  },
  getCurrentNavigation: jasmine.createSpy('getCurrentNavigation').and.returnValue({
    extras: {
      state: { publicacion: { id_publicacion: 1, titulo_publicacion: 'Título', descripcion_publicacion: 'Descripción', categoria_publicacion_id_categoria: [1] } }
    }
  })
};

const nativeStorageMock = jasmine.createSpyObj('NativeStorage', ['getItem']);
nativeStorageMock.getItem.and.returnValue(Promise.resolve(1));

const servicebdServiceMock = jasmine.createSpyObj('ServicebdService', ['fetchCategorias', 'modificarPublicaciones', 'presentAlert', 'presentToast']);
servicebdServiceMock.fetchCategorias.and.returnValue(of([{ id_categoria: 1, nombre_categoria: 'Categoría 1' }]));

describe('ModificarPublicacionPage', () => {
  let component: ModificarPublicacionPage;
  let fixture: ComponentFixture<ModificarPublicacionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarPublicacionPage],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: NativeStorage, useValue: nativeStorageMock },
        { provide: ServicebdService, useValue: servicebdServiceMock },
      ]
    });

    fixture = TestBed.createComponent(ModificarPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba básica
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
