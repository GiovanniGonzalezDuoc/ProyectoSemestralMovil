import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolPage } from './rol.page';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';

describe('RolPage', () => {
  let component: RolPage;
  let fixture: ComponentFixture<RolPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Mock del servicio
    serviceMock = jasmine.createSpyObj('ServicebdService', ['dbState', 'fetchRol', 'eliminarRol']);
    serviceMock.dbState.and.returnValue(of(true)); // Simula que la base de datos está lista

    // Mock del Router
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [RolPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: serviceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica la creación del componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
