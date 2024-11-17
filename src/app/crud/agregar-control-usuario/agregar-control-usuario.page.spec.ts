import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AgregarControlUsuarioPage } from './agregar-control-usuario.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

describe('AgregarControlUsuarioPage', () => {
  let component: AgregarControlUsuarioPage;
  let fixture: ComponentFixture<AgregarControlUsuarioPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(() => {
    serviceMock = jasmine.createSpyObj('ServicebdService', ['fetchUsuario', 'insertarControl']);
    serviceMock.fetchUsuario.and.returnValue(of([]));  // Mocking fetchUsuario to return an empty array

    TestBed.configureTestingModule({
      declarations: [ AgregarControlUsuarioPage ],
      imports: [ IonicModule.forRoot() ],
      providers: [
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarControlUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
