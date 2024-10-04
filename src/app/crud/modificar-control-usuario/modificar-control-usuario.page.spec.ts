import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarControlUsuarioPage } from './modificar-control-usuario.page';

describe('ModificarControlUsuarioPage', () => {
  let component: ModificarControlUsuarioPage;
  let fixture: ComponentFixture<ModificarControlUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarControlUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
