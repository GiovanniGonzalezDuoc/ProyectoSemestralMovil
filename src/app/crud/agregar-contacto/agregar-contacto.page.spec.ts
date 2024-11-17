import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AgregarContactoPage } from './agregar-contacto.page';
import { ServicebdService } from 'src/app/services/servicebd.service';

describe('AgregarContactoPage', () => {
  let component: AgregarContactoPage;
  let fixture: ComponentFixture<AgregarContactoPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(async () => {
    // Creamos un mock para el servicio ServicebdService
    serviceMock = jasmine.createSpyObj('ServicebdService', ['agregarContacto']);

    // Configuramos el entorno de pruebas
    await TestBed.configureTestingModule({
      declarations: [AgregarContactoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: serviceMock }, // Usamos el mock del servicio
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarContactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba predeterminada
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
