import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarPage } from './publicar.page';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera } from '@capacitor/camera';
import { of } from 'rxjs';

describe('PublicarPage', () => {
  let component: PublicarPage;
  let fixture: ComponentFixture<PublicarPage>;
  let servicebdServiceMock: jasmine.SpyObj<ServicebdService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    servicebdServiceMock = jasmine.createSpyObj('ServicebdService', ['fetchCategorias', 'insertarPublicacion', 'presentAlert', 'presentToast']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    // Mock para NativeStorage
    const nativeStorageMock = {
      getItem: jasmine.createSpy().and.returnValue(Promise.resolve(1)) // Resolviendo el valor del ID de usuario
    };

    // Mock para Camera
    const cameraMock = {
      getPhoto: jasmine.createSpy().and.returnValue(Promise.resolve({ webPath: 'mock-image-path' }))
    };

    // En el test de PublicarPage, en el setup
    servicebdServiceMock.fetchCategorias.and.returnValue(of());

    TestBed.configureTestingModule({
      declarations: [PublicarPage],
      providers: [
        { provide: ServicebdService, useValue: servicebdServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: NativeStorage, useValue: nativeStorageMock },
        { provide: Camera, useValue: cameraMock } // Proveer el mock de Camera
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Esto ejecuta ngOnInit y demás ciclo de vida
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show alert if the form is incomplete', () => {
    // Mocking incomplete form
    component.Titulo = '';
    component.Contenido = '';
    component.categoriasSeleccionadas = [];

    servicebdServiceMock.presentAlert.and.returnValue(Promise.resolve());

    // Trigger the method
    component.publicar();

    // Check if the alert was shown
    expect(servicebdServiceMock.presentAlert).toHaveBeenCalledWith('La Publicación está incompleta.', 'Favor de rellenar todos los campos de la publicación.');
  });
});
