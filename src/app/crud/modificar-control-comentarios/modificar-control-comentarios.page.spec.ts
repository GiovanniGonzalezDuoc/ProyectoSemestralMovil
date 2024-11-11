import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarControlComentariosPage } from './modificar-control-comentarios.page';

describe('ModificarControlComentariosPage', () => {
  let component: ModificarControlComentariosPage;
  let fixture: ComponentFixture<ModificarControlComentariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarControlComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
