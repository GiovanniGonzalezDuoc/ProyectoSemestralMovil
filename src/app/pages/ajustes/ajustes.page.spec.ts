import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AjustesPage } from './ajustes.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';

describe('AjustesPage', () => {
  let component: AjustesPage;
  let fixture: ComponentFixture<AjustesPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let storageMock: jasmine.SpyObj<NativeStorage>;

  beforeEach(() => {
    serviceMock = jasmine.createSpyObj('ServicebdService', ['dbState', 'fetchUsuario', 'listarUsuarioID', 'fetchCarreras', 'verificarEmail', 'modificarInformacion', 'modificarContra', 'presentToast', 'presentAlert']);
    storageMock = jasmine.createSpyObj('NativeStorage', ['getItem', 'setItem']);

    // Mocking the methods
    serviceMock.dbState.and.returnValue(of(true));  // Simulamos que la base de datos está lista
    serviceMock.fetchUsuario.and.returnValue(of([])); // Simulamos la respuesta de fetchUsuario
    serviceMock.fetchCarreras.and.returnValue(of([])); // Simulamos las carreras obtenidas
    storageMock.getItem.and.returnValue(Promise.resolve('1')); // Simulamos la obtención de id_usuario

    TestBed.configureTestingModule({
      declarations: [AjustesPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        { provide: NativeStorage, useValue: storageMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AjustesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
