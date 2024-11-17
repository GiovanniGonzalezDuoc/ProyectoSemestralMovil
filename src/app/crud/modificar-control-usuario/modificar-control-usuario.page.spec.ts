import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ModificarControlUsuarioPage } from './modificar-control-usuario.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';

describe('ModificarControlUsuarioPage', () => {
  let component: ModificarControlUsuarioPage;
  let fixture: ComponentFixture<ModificarControlUsuarioPage>;
  let activatedRouteMock: any;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(() => {
    activatedRouteMock = { queryParams: { subscribe: jasmine.createSpy().and.returnValue(of({})) } };
    serviceMock = jasmine.createSpyObj('ServicebdService', ['modificarControl']);
    
    TestBed.configureTestingModule({
      declarations: [ ModificarControlUsuarioPage ],
      imports: [ IonicModule.forRoot() ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarControlUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });
});
