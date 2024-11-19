import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let routerMock: any;
  let nativeStorageMock: any;
  let servicebdServiceMock: any;

  beforeEach(async () => {
    // Crear mocks minimalistas
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    nativeStorageMock = jasmine.createSpyObj('NativeStorage', ['setItem']);

    servicebdServiceMock = jasmine.createSpyObj('ServicebdService', [
      'recopilarDatos',
      'verificarBaneo',
      'presentAlert',
      'presentToast',
    ]);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: NativeStorage, useValue: nativeStorageMock },
        { provide: ServicebdService, useValue: servicebdServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Alerta de correo invalido', () => {
    component.emailsolicitado = 'correoIncorrecto';
    component.contrasenasolicitada = 'ContrasenaValida1!';
    component.validarDatos();
    
    expect(servicebdServiceMock.presentAlert).toHaveBeenCalledWith('Correo Inválido', 'Por favor ingrese un correo electrónico válido.');
  });

  it('Alerta de contraseña invalida', () => {
    component.emailsolicitado = 'correo@dominio.com';
    component.contrasenasolicitada = 'pass';
    component.validarDatos();
    
    expect(servicebdServiceMock.presentAlert).toHaveBeenCalledWith('Contraseña Inválida', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.');
  });

});
