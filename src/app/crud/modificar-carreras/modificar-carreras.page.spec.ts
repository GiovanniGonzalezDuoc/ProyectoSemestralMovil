import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarCarrerasPage } from './modificar-carreras.page';

describe('ModificarCarrerasPage', () => {
  let component: ModificarCarrerasPage;
  let fixture: ComponentFixture<ModificarCarrerasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarCarrerasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
