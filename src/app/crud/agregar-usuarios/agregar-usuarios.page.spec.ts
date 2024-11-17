import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarUsuariosPage } from './agregar-usuarios.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

// Mock del servicio
class ServicebdServiceMock {
  fetchPreguntas() {
    return of([]); // Retorna un observable vacío simulando que no hay preguntas
  }
  
  fetchCarreras() {
    return of([]); // Retorna un observable vacío simulando que no hay carreras
  }
  
  fetchRol() {
    return of([]); // Retorna un observable vacío simulando que no hay roles
  }

  insertarUsuario(nombre_usuario: string, apellido_usuario: string, carreraSeleccionada: number, telefono: number, correo_usuario: string, contrasena: string, rol_usuario: number, preguntaSeleccionada: number, respuesta: string) {
    return of(null); // Simula la inserción del usuario sin hacer nada
  }
}

describe('AgregarUsuariosPage', () => {
  let component: AgregarUsuariosPage;
  let fixture: ComponentFixture<AgregarUsuariosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarUsuariosPage ],
      providers: [
        { provide: ServicebdService, useClass: ServicebdServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
