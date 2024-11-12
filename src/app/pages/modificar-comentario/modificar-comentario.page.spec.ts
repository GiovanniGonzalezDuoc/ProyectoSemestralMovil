import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarComentarioPage } from './modificar-comentario.page';

describe('ModificarComentarioPage', () => {
  let component: ModificarComentarioPage;
  let fixture: ComponentFixture<ModificarComentarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarComentarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
