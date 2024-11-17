import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ContactoPage } from './contacto.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('ContactoPage', () => {
  let component: ContactoPage;
  let fixture: ComponentFixture<ContactoPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let storageMock: jasmine.SpyObj<NativeStorage>;
  let routerMock: jasmine.SpyObj<Router>;
  let activatedRouteMock: any;

  beforeEach(() => {
    serviceMock = jasmine.createSpyObj('ServicebdService', ['dbState', 'insertarContacto', 'presentAlert', 'presentToast']);
    // Simular que dbState retorna un observable
    serviceMock.dbState.and.returnValue(of(true));
    storageMock = jasmine.createSpyObj('NativeStorage', ['getItem']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    // Mock de ActivatedRoute con queryParams como observable
    activatedRouteMock = { queryParams: { subscribe: jasmine.createSpy().and.returnValue(of({})) } };

    TestBed.configureTestingModule({
      declarations: [ContactoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        { provide: NativeStorage, useValue: storageMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
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
