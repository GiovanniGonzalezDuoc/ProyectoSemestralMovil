import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarControlControlPublicacionPage } from './modificar-control-control-publicacion.page';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';

describe('ModificarControlControlPublicacionPage', () => {
  let component: ModificarControlControlPublicacionPage;
  let fixture: ComponentFixture<ModificarControlControlPublicacionPage>;
  let activatedRouteMock: any;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(() => {
    // Mock para ActivatedRoute
    activatedRouteMock = {
      queryParams: of({})  // Simulamos que no hay parámetros adicionales en queryParams
    };

    // Mock para el servicio
    serviceMock = jasmine.createSpyObj('ServicebdService', ['fetchPublicacion', 'modificarControlPublicacion']);
    serviceMock.fetchPublicacion.and.returnValue(of([]));  // Simulamos que no hay publicaciones

    TestBed.configureTestingModule({
      declarations: [ ModificarControlControlPublicacionPage ],
      imports: [ IonicModule.forRoot() ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarControlControlPublicacionPage);
    component = fixture.componentInstance;

    // Establecer el valor de Control manualmente para simular un caso real
    component.Control = {
      publicacion_id_publicacion: 1,  // Asignamos un ID de publicación para filtrar
    };

    fixture.detectChanges();  // Detectar cambios en el componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verificar que el componente se haya creado correctamente
  });
});
