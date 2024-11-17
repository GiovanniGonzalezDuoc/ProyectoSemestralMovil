import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarControlComentariosPage } from './modificar-control-comentarios.page';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';

describe('ModificarControlComentariosPage', () => {
  let component: ModificarControlComentariosPage;
  let fixture: ComponentFixture<ModificarControlComentariosPage>;
  let activatedRouteMock: any;
  let serviceMock: jasmine.SpyObj<ServicebdService>;

  beforeEach(() => {
    // Mock para ActivatedRoute
    activatedRouteMock = {
      queryParams: of({})  // Simulamos sin valores adicionales
    };

    // Mock para el servicio
    serviceMock = jasmine.createSpyObj('ServicebdService', ['fetchComentarios', 'modificarControlComentarios']);
    serviceMock.fetchComentarios.and.returnValue(of([]));  // Simulamos que no hay comentarios

    TestBed.configureTestingModule({
      declarations: [ModificarControlComentariosPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ServicebdService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarControlComentariosPage);
    component = fixture.componentInstance;

    // Establecer el valor de Control manualmente
    component.Control = {
      comentario_id_comentario: 1,  // Agregar un valor de prueba para el comentario_id_comentario
    };

    fixture.detectChanges();  // Detectar cambios en el componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verificar que el componente se crea correctamente
  });

  it('should call fetchComentarios when Control is set', () => {
    component.ngOnInit();
    expect(serviceMock.fetchComentarios).toHaveBeenCalled();  // Verificar que `fetchComentarios` fue llamado
  });

  it('should call modificarControlComentarios on modificar()', () => {
    component.modificar();
    expect(serviceMock.modificarControlComentarios).toHaveBeenCalled();  // Verificar que se llama al método `modificarControlComentarios`
  });
});
