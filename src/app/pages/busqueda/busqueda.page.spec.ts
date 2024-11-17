import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BusquedaPage } from './busqueda.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BusquedaPage', () => {
  let component: BusquedaPage;
  let fixture: ComponentFixture<BusquedaPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let storageMock: jasmine.SpyObj<NativeStorage>;
  let activatedRouteMock: any;

  beforeEach(() => {
    // Crear el mock de ServicebdService
    serviceMock = jasmine.createSpyObj('ServicebdService', [
      'dbState',
      'listarPublicacionesCategorias',
      'fetchPublicacion',
      'fetchCategorias',
      'aumentarLike',
      'insertarGuardado',
      'listarGuardado',
      'presentAlert',
      'presentToast'
    ]);

    // Simular que dbState retorna un observable
    serviceMock.dbState.and.returnValue(of(true));


    // Crear el mock de NativeStorage con métodos que devuelvan promesas
    storageMock = jasmine.createSpyObj('NativeStorage', ['getItem', 'setItem']);
    storageMock.getItem.and.returnValue(Promise.resolve('mockValue')); // Simula la promesa de getItem
    storageMock.setItem.and.returnValue(Promise.resolve()); // Simula la promesa de setItem

    // Mock de ActivatedRoute con queryParams como observable
    activatedRouteMock = { queryParams: { subscribe: jasmine.createSpy().and.returnValue(of({})) } };

    TestBed.configureTestingModule({
      declarations: [BusquedaPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        { provide: NativeStorage, useValue: storageMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
