import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoSeguidoresPage } from './listado-seguidores.page';

describe('ListadoSeguidoresPage', () => {
  let component: ListadoSeguidoresPage;
  let fixture: ComponentFixture<ListadoSeguidoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoSeguidoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
