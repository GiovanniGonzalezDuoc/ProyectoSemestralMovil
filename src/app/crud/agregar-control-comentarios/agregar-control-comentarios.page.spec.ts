import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarControlComentariosPage } from './agregar-control-comentarios.page';

describe('AgregarControlComentariosPage', () => {
  let component: AgregarControlComentariosPage;
  let fixture: ComponentFixture<AgregarControlComentariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarControlComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
