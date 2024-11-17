import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPublicacionPage } from './agregar-publicacion.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

describe('AgregarPublicacionPage', () => {
  let component: AgregarPublicacionPage;
  let fixture: ComponentFixture<AgregarPublicacionPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(() => {
    serviceMock = jasmine.createSpyObj('ServicebdService', ['fetchCategorias', 'fetchUsuario', 'insertarPublicacion']);
    serviceMock.fetchCategorias.and.returnValue(of([]));  // Mocking fetchCategorias
    serviceMock.fetchUsuario.and.returnValue(of([]));  // Mocking fetchUsuario

    TestBed.configureTestingModule({
      declarations: [ AgregarPublicacionPage ],
      providers: [
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
