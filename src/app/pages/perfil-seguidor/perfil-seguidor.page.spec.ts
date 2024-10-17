import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilSeguidorPage } from './perfil-seguidor.page';

describe('PerfilSeguidorPage', () => {
  let component: PerfilSeguidorPage;
  let fixture: ComponentFixture<PerfilSeguidorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilSeguidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
