import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicacionPage } from './publicacion.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';

describe('PublicacionPage', () => {
  let component: PublicacionPage;
  let fixture: ComponentFixture<PublicacionPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Mock del servicio
    serviceMock = jasmine.createSpyObj('ServicebdService', ['dbState', 'fetchPublicacion', 'eliminarPublicacion']);
    serviceMock.dbState.and.returnValue(of(true)); // Simula que la base de datos está lista

    // Mock del Router
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PublicacionPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
