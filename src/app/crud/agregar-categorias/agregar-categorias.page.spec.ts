import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCategoriasPage } from './agregar-categorias.page';

describe('AgregarCategoriasPage', () => {
  let component: AgregarCategoriasPage;
  let fixture: ComponentFixture<AgregarCategoriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
