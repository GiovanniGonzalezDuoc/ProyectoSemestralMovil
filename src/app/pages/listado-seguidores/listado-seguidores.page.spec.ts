import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ListadoSeguidoresPage } from './listado-seguidores.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Mocks para los servicios
const routerMock = {
  navigate: jasmine.createSpy('navigate')
};

const nativeStorageMock = {
  getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
    if (key === 'id_usuario') return Promise.resolve(1);
    if (key === 'rol_id_rol') return Promise.resolve(2);
    return Promise.reject('Key not found');
  })
};

const servicebdServiceMock = jasmine.createSpyObj('ServicebdService', [
  'listarSeguimientos',
  'listarUsuarioID'
]);

servicebdServiceMock.listarSeguimientos.and.returnValue(Promise.resolve([]));
servicebdServiceMock.listarUsuarioID.and.returnValue(Promise.resolve({
  id_usuario: 1,
  nombre_usuario: 'John',
  apellido_usuario: 'Doe'
}));

describe('ListadoSeguidoresPage', () => {
  let component: ListadoSeguidoresPage;
  let fixture: ComponentFixture<ListadoSeguidoresPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoSeguidoresPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: NativeStorage, useValue: nativeStorageMock },
        { provide: ServicebdService, useValue: servicebdServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoSeguidoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
