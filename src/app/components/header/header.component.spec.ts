import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let servicebdService: ServicebdService;

  beforeEach(waitForAsync(() => {
    // Mock del servicio ServicebdService
    const servicebdServiceMock = {
      // Aquí puedes agregar los métodos que el componente usa si es necesario, por ejemplo:
      someMethod: jasmine.createSpy().and.returnValue(of([])), 
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: ServicebdService, useValue: servicebdServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    servicebdService = TestBed.inject(ServicebdService); // Accede al servicio mockeado
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
