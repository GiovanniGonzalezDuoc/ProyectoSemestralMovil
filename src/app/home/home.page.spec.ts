import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HeaderComponent } from '../components/header/header.component';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let storageMock: jasmine.SpyObj<NativeStorage>;

  beforeEach(async () => {
    serviceMock = jasmine.createSpyObj('ServicebdService', ['dbState', 'fetchControlPublicaciones', 'fetchPublicacion', 'fetchCategorias', 'aumentarLike', 'presentToast']);
    storageMock = jasmine.createSpyObj('NativeStorage', ['getItem', 'setItem']);

    serviceMock.dbState.and.returnValue(of(true));
    serviceMock.fetchControlPublicaciones.and.returnValue(of([]));
    serviceMock.fetchPublicacion.and.returnValue(of([]));
    serviceMock.fetchCategorias.and.returnValue(of([]));
    storageMock.getItem.and.returnValue(Promise.resolve('1'));

    await TestBed.configureTestingModule({
      declarations: [HomePage, HeaderComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        { provide: NativeStorage, useValue: storageMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
