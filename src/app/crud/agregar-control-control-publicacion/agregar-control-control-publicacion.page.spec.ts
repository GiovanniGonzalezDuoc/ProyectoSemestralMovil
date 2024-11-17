import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AgregarControlControlPublicacionPage } from './agregar-control-control-publicacion.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

describe('AgregarControlControlPublicacionPage', () => {
  let component: AgregarControlControlPublicacionPage;
  let fixture: ComponentFixture<AgregarControlControlPublicacionPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(() => {
    serviceMock = jasmine.createSpyObj('ServicebdService', ['fetchPublicacion', 'insertarControlPublicacion']);
    serviceMock.fetchPublicacion.and.returnValue(of([]));  // Mocking fetchPublicacion to return an empty array

    TestBed.configureTestingModule({
      declarations: [ AgregarControlControlPublicacionPage ],
      imports: [ IonicModule.forRoot() ],
      providers: [
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarControlControlPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
