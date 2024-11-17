import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ModificarCategoriasPage } from './modificar-categorias.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ModificarCategoriasPage', () => {
  let component: ModificarCategoriasPage;
  let fixture: ComponentFixture<ModificarCategoriasPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let activatedRouteMock: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    // Crear mocks para los servicios
    serviceMock = jasmine.createSpyObj('ServicebdService', ['modificarCategoria']);
    activatedRouteMock = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);

    // Configurar el observable para queryParams
    activatedRouteMock.queryParams = of({ categoria: { id_categoria: 1, nombre_categoria: 'Tecnología' } });

    TestBed.configureTestingModule({
      declarations: [ModificarCategoriasPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarCategoriasPage);
    component = fixture.componentInstance;

    // Detectar cambios después de configurar los mocks
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verificación de la creación del componente
  });

});
