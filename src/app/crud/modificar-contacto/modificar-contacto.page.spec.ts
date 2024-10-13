import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarContactoPage } from './modificar-contacto.page';

describe('ModificarContactoPage', () => {
  let component: ModificarContactoPage;
  let fixture: ComponentFixture<ModificarContactoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarContactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
