import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlComentariosPage } from './control-comentarios.page';

describe('ControlComentariosPage', () => {
  let component: ControlComentariosPage;
  let fixture: ComponentFixture<ControlComentariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
