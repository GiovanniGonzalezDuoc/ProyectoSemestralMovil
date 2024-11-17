import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ListaControlPublicacionPage } from './lista-control-publicacion.page';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

// Mocks para Router y NativeStorage
const routerMock = {
  navigate: jasmine.createSpy('navigate')
};

const nativeStorageMock = {
  getItem: jasmine.createSpy('getItem').and.returnValue(Promise.resolve(1))
};

// Mock para el ServicebdService
const servicebdServiceMock = jasmine.createSpyObj('ServicebdService', [
  'dbState',
  'fetchControlPublicaciones',
  'fetchPublicacion',
  'fetchCategorias',
  'presentAlert'
]);

servicebdServiceMock.dbState.and.returnValue(of(true));
servicebdServiceMock.fetchControlPublicaciones.and.returnValue(of([]));
servicebdServiceMock.fetchPublicacion.and.returnValue(of([]));
servicebdServiceMock.fetchCategorias.and.returnValue(of([]));

describe('ListaControlPublicacionPage', () => {
  let component: ListaControlPublicacionPage;
  let fixture: ComponentFixture<ListaControlPublicacionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaControlPublicacionPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: NativeStorage, useValue: nativeStorageMock },
        { provide: ServicebdService, useValue: servicebdServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaControlPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
