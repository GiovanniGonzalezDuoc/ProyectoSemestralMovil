import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCarrerasPage } from './agregar-carreras.page';

describe('AgregarCarrerasPage', () => {
  let component: AgregarCarrerasPage;
  let fixture: ComponentFixture<AgregarCarrerasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCarrerasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
