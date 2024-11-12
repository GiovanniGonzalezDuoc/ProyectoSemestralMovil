import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaControlComentarioPage } from './lista-control-comentario.page';

describe('ListaControlComentarioPage', () => {
  let component: ListaControlComentarioPage;
  let fixture: ComponentFixture<ListaControlComentarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaControlComentarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
