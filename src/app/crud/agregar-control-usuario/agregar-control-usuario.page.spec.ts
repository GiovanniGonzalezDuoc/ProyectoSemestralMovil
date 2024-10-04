import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarControlUsuarioPage } from './agregar-control-usuario.page';

describe('AgregarControlUsuarioPage', () => {
  let component: AgregarControlUsuarioPage;
  let fixture: ComponentFixture<AgregarControlUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarControlUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
