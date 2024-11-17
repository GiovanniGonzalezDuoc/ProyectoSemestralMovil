import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AgregarCategoriasPage } from './agregar-categorias.page';
import { ServicebdService } from 'src/app/services/servicebd.service';

describe('AgregarCategoriasPage', () => {
  let component: AgregarCategoriasPage;
  let fixture: ComponentFixture<AgregarCategoriasPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(async () => {
    // Creamos un mock para el servicio ServicebdService
    serviceMock = jasmine.createSpyObj('ServicebdService', ['agregarCategoria']);

    // Configuramos el entorno de pruebas
    await TestBed.configureTestingModule({
      declarations: [AgregarCategoriasPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: serviceMock }, // Usamos el mock del servicio
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarCategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba predeterminada
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
