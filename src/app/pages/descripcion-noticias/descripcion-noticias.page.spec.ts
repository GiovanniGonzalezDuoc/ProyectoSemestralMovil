import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescripcionNoticiasPage } from './descripcion-noticias.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

describe('DescripcionNoticiasPage', () => {
  let component: DescripcionNoticiasPage;
  let fixture: ComponentFixture<DescripcionNoticiasPage>;
  let mockServicebd: jasmine.SpyObj<ServicebdService>;
  let mockNativeStorage: jasmine.SpyObj<NativeStorage>;

  beforeEach(() => {
    mockServicebd = jasmine.createSpyObj('ServicebdService', ['presentAlert']);
    mockNativeStorage = jasmine.createSpyObj('NativeStorage', ['getItem']);
    mockNativeStorage.getItem.and.returnValue(Promise.resolve('12345')); // Devuelve una promesa resuelta con un valor simulado

    TestBed.configureTestingModule({
      declarations: [DescripcionNoticiasPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: ServicebdService, useValue: mockServicebd },
        { provide: NativeStorage, useValue: mockNativeStorage },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DescripcionNoticiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
