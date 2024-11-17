import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactoPage } from './contacto.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

// Mock del servicio ServicebdService
class ServicebdServiceMock {
  dbState() {
    return of(true);  // Simula que la base de datos está lista
  }

  fetchContacto() {
    return of([{
      id_contacto: 1,
      correo_usuario_contacto: 'usuario@ejemplo.com',
      mensaje_contacto: 'Mensaje de contacto'
    }]); // Simula la respuesta de los contactos
  }

  eliminarContacto(id_contacto: number) {
    return of(null); // Simula la eliminación de un contacto
  }
}

describe('ContactoPage', () => {
  let component: ContactoPage;
  let fixture: ComponentFixture<ContactoPage>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ContactoPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: ServicebdService, useClass: ServicebdServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
