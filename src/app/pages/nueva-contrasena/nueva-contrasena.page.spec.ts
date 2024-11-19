import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaContrasenaPage } from './nueva-contrasena.page';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

describe('NuevaContrasenaPage', () => {
  let component: NuevaContrasenaPage;
  let fixture: ComponentFixture<NuevaContrasenaPage>;
  let mockServicebd: jasmine.SpyObj<ServicebdService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Crear espías para las dependencias
    mockServicebd = jasmine.createSpyObj('ServicebdService', ['presentAlert', 'presentToast', 'modificarContrasena']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [NuevaContrasenaPage],
      providers: [
        { provide: ServicebdService, useValue: mockServicebd },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { queryParams: of({ email: 'test@example.com' }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica Si las contraseñas no son iguales', () => {
    // Simulamos que las contraseñas no coinciden
    component.contrasenasolicitado = 'Password1!';
    component.recontrasenasolicitada = 'Password2!';

    // Llamamos al método para cambiar la contraseña
    component.Contrasena();

    // Verificamos que se haya llamado al método presentAlert con el mensaje correspondiente
    expect(mockServicebd.presentAlert).toHaveBeenCalledWith(
      'Error En Las Contraseñas',
      'Las contraseñas ingresadas no son iguales.'
    );
  });
})