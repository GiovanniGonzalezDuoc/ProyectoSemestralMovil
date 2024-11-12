import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaControlPublicacionPage } from './lista-control-publicacion.page';

describe('ListaControlPublicacionPage', () => {
  let component: ListaControlPublicacionPage;
  let fixture: ComponentFixture<ListaControlPublicacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaControlPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
