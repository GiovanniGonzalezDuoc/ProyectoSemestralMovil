import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ListaControlComentarioPage } from './lista-control-comentario.page';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

// Creamos un mock para Router y NativeStorage
const routerMock = {
  navigate: jasmine.createSpy('navigate')
};

const nativeStorageMock = {
  getItem: jasmine.createSpy('getItem').and.returnValue(Promise.resolve(1))
};

// Creamos un mock para el ServicebdService
const servicebdServiceMock = jasmine.createSpyObj('ServicebdService', [
  'dbState',
  'fetchControlComentarios',
  'fetchPublicacion',
  'fetchComentarios',
  'fetchCategorias',
  'presentAlert'
]);

servicebdServiceMock.dbState.and.returnValue(of(true));
servicebdServiceMock.fetchControlComentarios.and.returnValue(of([]));
servicebdServiceMock.fetchPublicacion.and.returnValue(of([]));
servicebdServiceMock.fetchComentarios.and.returnValue(of([]));
servicebdServiceMock.fetchCategorias.and.returnValue(of([]));

describe('ListaControlComentarioPage', () => {
  let component: ListaControlComentarioPage;
  let fixture: ComponentFixture<ListaControlComentarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaControlComentarioPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: NativeStorage, useValue: nativeStorageMock },
        { provide: ServicebdService, useValue: servicebdServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaControlComentarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
