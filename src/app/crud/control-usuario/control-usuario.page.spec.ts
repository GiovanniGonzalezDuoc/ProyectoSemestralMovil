import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlUsuarioPage } from './control-usuario.page';

describe('ControlUsuarioPage', () => {
  let component: ControlUsuarioPage;
  let fixture: ComponentFixture<ControlUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
