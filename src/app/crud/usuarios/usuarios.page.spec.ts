import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosPage } from './usuarios.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';

describe('UsuariosPage', () => {
  let component: UsuariosPage;
  let fixture: ComponentFixture<UsuariosPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Mock del servicio
    serviceMock = jasmine.createSpyObj('ServicebdService', ['dbState', 'fetchUsuario', 'eliminarUsuario']);
    serviceMock.dbState.and.returnValue(of(true)); // Simula que la base de datos está listaados

    // Mock del Router
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [UsuariosPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica la creación del componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
