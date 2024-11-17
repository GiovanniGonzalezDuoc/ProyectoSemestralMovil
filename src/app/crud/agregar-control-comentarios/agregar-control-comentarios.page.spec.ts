import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AgregarControlComentariosPage } from './agregar-control-comentarios.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

describe('AgregarControlComentariosPage', () => {
  let component: AgregarControlComentariosPage;
  let fixture: ComponentFixture<AgregarControlComentariosPage>;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(() => {
    serviceMock = jasmine.createSpyObj('ServicebdService', ['fetchComentarios', 'insertarControl']);
    serviceMock.fetchComentarios.and.returnValue(of([]));  // Mocking fetchComentarios to return an empty array

    TestBed.configureTestingModule({
      declarations: [ AgregarControlComentariosPage ],
      imports: [ IonicModule.forRoot() ],
      providers: [
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarControlComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
