import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarCategoriasPage } from './modificar-categorias.page';

describe('ModificarCategoriasPage', () => {
  let component: ModificarCategoriasPage;
  let fixture: ComponentFixture<ModificarCategoriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarCategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
