import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarRolPage } from './agregar-rol.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

// Mock del servicio
class ServicebdServiceMock {
  insertarRol(nombre_rol: string) {
    return of(null); // Simula la respuesta del método insertarRol
  }
}

describe('AgregarRolPage', () => {
  let component: AgregarRolPage;
  let fixture: ComponentFixture<AgregarRolPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarRolPage ],
      providers: [
        { provide: ServicebdService, useClass: ServicebdServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarRolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
